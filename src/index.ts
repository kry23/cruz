/*
  _____  _____  ______ _______ _______ _____ ______ _____    _  ___    _ _      _               _   _ 
 |  __ \|  __ \|  ____|__   __|__   __|_   _|  ____|  __ \  | |/ / |  | | |    | |        /\   | \ | |
 | |__) | |__) | |__     | |     | |    | | | |__  | |__) | | ' /| |  | | |    | |       /  \  |  \| |
 |  ___/|  _  /|  __|    | |     | |    | | |  __| |  _  /  |  < | |  | | |    | |      / /\ \ | . ` |
 | |    | | \ \| |____   | |     | |   _| |_| |____| | \ \  | . \| |__| | |____| |____ / ____ \| |\  |
 |_|    |_|  \_\______|  |_|     |_|  |_____|______|_|  \_\ |_|\_\\____/|______|______/_/    \_\_| \_|
                                                                                                      
*/

import express, { Request, Response } from "express";
import cookieSession from "cookie-session";
// Express bu özellikleri içe aldı artık body parser kurmana gerek yok
// import bodyParser from "body-parser";

// BEST PRACTICE: routes adında bir klasörün varsa içine bir index ata klasördekileri o çıkarsın.
import { amazingRouter } from "./routes";

const app = express();

app.use(cookieSession({ keys: [""] }));

// form encoded kullanmıyorsun
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(amazingRouter);

app.listen(3001, () => {
  console.log("listening on 3001");
});
