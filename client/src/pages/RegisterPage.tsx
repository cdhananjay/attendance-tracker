import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const RegisterPage = () => {
    const nav = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    async function submitForm(e : React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        try {
            const {data} = await axios.post("/api/auth/register", {
                username,
                password
            });
            if (data.ok) alert("user registered");
            else alert(data.message);
            nav('/dashboard');
        } catch (e) {
            alert(e)
        }
    }
    return (
        <main className={"flex flex-col justify-center items-center gap-10 min-h-screen"}>
            <div className={"flex gap-5 flex-col justify-center items-center"}>
                <img
                    className={"w-30"}
                    src="/vite.svg" />
                <h1 className={"text-3xl font-extrabold"}>Attendance Manager</h1>
            </div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Register your account</CardTitle>
                    <CardDescription>
                        Enter your unique username.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input onChange={(e)=> setUsername(e.target.value)}
                                       id="username"
                                       type="text"
                                       required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input onChange={(e)=> setPassword(e.target.value)} id="password" type="password" required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button
                        onClick={(e)=>submitForm(e)}
                        type="submit" className="w-full">
                        Register
                    </Button>
                    <Link
                        to="/login"
                        className=" inline-block text-sm underline-offset-4 hover:underline"
                    >
                        Already Registered? Login Instead
                    </Link>
                </CardFooter>
            </Card>
        </main>
    )
}

export default RegisterPage;
