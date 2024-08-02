import { Wallet } from "./wallet";

export interface User {
    fullName: string;
    username: string;
    password: string;
    email: string;
    memberSince?: Date; 
    wallet?: Wallet;
}