import { Request, Response } from "express";
import pool from "../database/db";

const getUsers = (req: Request, res: Response) => {
    pool.query("SELECT * FROM users", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getPhrases = (req: Request, res: Response) => {
    pool.query("SELECT * FROM phrases", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

export default { getUsers, getPhrases };
