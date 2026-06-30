import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService{
    client = new Client()
    account;

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl) // Your API Endpoint
                .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client)
    }

    async createAccount({email,password,name}){
        try {
            const userAccount= await this.account.create({
            userId: ID.unique(), 
            email, 
            password,
            name,
            })
            
            if(userAccount){
                return this.login({email,password});
            }else{
                return userAccount;
            }

        } catch (error) {
            return error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession({email,password})
        } catch (error) {
            return error;
        }
    }

    async getCurrentuser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log(error);
            return null;
        }
        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            return error
        }
    }
}

const authService=new AuthService();

export default authService;