import { Router, Request, Response, NextFunction } from "express";
import { People } from "./People";
import JWT, { JsonWebTokenError, VerifyErrors } from "jsonwebtoken";


const amazingRouter = Router();
const accessTokenSecret = "topsecret";

// Typescript kullanma amacımız bunların hepsine type vermek hani bunun interface'i? // bu tamam
let people: People[] = [
  {
    id: 1,
    name: "koray",
  },
  {
    id: 2,
    name: "burak",
  },

  {
    id: 3,
    name: "eldar",
  },
];

const verifyToken = (req:Request,res:Response,next:NextFunction) =>   
{
  const  bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      (<any>req).token = bearerToken;
      next();
  }else {
    res.sendStatus(403);
  }

}

amazingRouter.get("/login", (req: Request, res: Response) => {
  // fotmencoded değil json kabul et.
  // token üret onu döndür.
  // sonra bu tokeni Authorization isminde bir header'la kabul edip kullanıcının login olup olmadığını anla
});




amazingRouter.post("/login", (req: Request, res: Response) => {
  
    // API'ye böyle giriş yapılmaz. JWT kullan.
  JWT.sign({ people }, "topsecret", (err :any , token) => {
    res.json({
      token,
    });
  });
});

amazingRouter.post("/login/posts",verifyToken,(req:Request,res:Response)=>{
  
  JWT.verify((<any>req).token,'topsecret',(err,authData)=>{
    if(err){
      res.sendStatus(403);
    }else {
      res.json({
        
        message:'Post created....',
        authData
      })
    }
  })
  
})

amazingRouter.get("/", (req: Request, res: Response, next) => {
  // if (req.session && req.session.loggedIn)
  // Bunu middleware yap

  /*
  if (req.session && req.session.loggedIn) {
    res.send(`
            <div> 
                <div> You are logged in</div>
                <a href="/logout">Logout</a>
            </div>    
            `);
  } else {
    res.send(`
        <div> 
            <div> You are not logged in</div>
            <a href="/login">Login</a>
        </div>    
        `);
  }
  */
  res.json({ error: "Not Implemented" });
});

// Bunu sil api'de logout olmaz. cookie de kullanılmaz zaten.
/*
router.get("/logout", (req: Request, res: Response) => {
  res.redirect("/");
});
*/

amazingRouter.get("/lol", (req: Request, res: Response) => {
  res.json(people);
});

// router.post('/lol',(req:Request,res:Response)=>{
//     const {productName,productDesc} = req.body;
//     res.send (productName+productDesc);
//  })

amazingRouter.get("/lol/:id", (req: Request, res: Response) => {
  res.json(people.filter((person) => person.id === parseInt(req.params.id)));
});

amazingRouter.post("/lol/", (req: Request, res: Response) => {
  const newPerson = {
    id: 5,
    name: req.body.name,
  };

  people.push(newPerson);
  res.json(people);
});

amazingRouter.put("/lol/:id", (req: Request, res: Response) => {
  const found = people.some((person) => person.id === parseInt(req.params.id));

  // Denemesini yapmadım ama mantığım çalışır diyor.
  if (found) {
    people = people.map((p: any) => {
      if (p.id === parseInt(req.params.id)) {
        return { id: parseInt(req.params.id), ...req.body };
      }
      return p;
    });
  } else {
    // msg değil mesage. Bu bir best practice bak.
    res
      .status(400)
      .json({ message: `no person with the id of ${req.params.id}` });
  }

  /*

    if(found) {
        const updPerson = req.body;
        people.forEach(person => {
            if(person.id === parseInt(req.params.id))
            {
                person.name = updPerson.name ? updPerson.name : person.name; 
                
                res.json({msg: 'person updated',person})
            }
        })
    }else{
        res.status(400).json({msg: `no person with the id of ${req.params.id}`});
    }
    */
});

// BEST PRACTICE: birden fazla router'ın olduğunda napcan? hepsine router dersen karışmaz mı? --tamam
// rename...
export { amazingRouter };
