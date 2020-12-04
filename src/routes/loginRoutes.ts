import { Router, Request, Response } from "express";
import {People} from "./People";




const router = Router();

// Typescript kullanma amacımız bunların hepsine type vermek hani bunun interface'i?
let people: People = 
  [{
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
  }]



router.get("/login", (req: Request, res: Response) => {
    // fotmencoded değil json kabul et. 
    // token üret onu döndür.
    // sonra bu tokeni Authorization isminde bir header'la kabul edip kullanıcının login olup olmadığını anla
    /*
  res.send(`
    <form method="POST">
    <div>
        <label>Email</label>
        <input name="email" />
    </div>
    <div>
        <label>Password</label>
        <input name="password" type="password"/>
    </div>
    <button>Submit</button>
    </form>
    `);
    */
     res.json({ error: "Not Implemented" });
});

router.post("/login", (req: Request, res: Response) => {
    // API'ye böyle giriş yapılmaz. JWT kullan.
    /*
  const { email, password } = req.body;
  if (email && password && email === "hi@hi.com" && password === "password") {
    req.session = { loggedIn: true };
    res.redirect("/");
  } else {
    res.send("invalid email or password ");
  }
  */
 res.json({ error: "Not Implemented" });
});

router.get("/", (req: Request, res: Response) => {
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
 res.json({ error: "Not Implemented" })
});

// Bunu sil api'de logout olmaz. cookie de kullanılmaz zaten.
/*
router.get("/logout", (req: Request, res: Response) => {
  res.redirect("/");
});
*/

router.get("/lol", (req: Request, res: Response) => {
  res.json(people);
});

// router.post('/lol',(req:Request,res:Response)=>{
//     const {productName,productDesc} = req.body;
//     res.send (productName+productDesc);
//  })

router.get("/lol/:id", (req: Request, res: Response) => {
  res.json(people.filter((person) => person.id === parseInt(req.params.id)));
});

router.post("/lol/", (req: Request, res: Response) => {
  const newPerson = {
    id: 5,
    name: req.body.name,
  };
  
  people.push(newPerson);
  res.json(people);
});

router.put("/lol/:id", (req: Request, res: Response) => {
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
    res.status(400).json({ message: `no person with the id of ${req.params.id}` });
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


// BEST PRACTICE: birden fazla router'ın olduğunda napcan? hepsine router dersen karışmaz mı?
// rename...
export { router };
