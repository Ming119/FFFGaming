import { Form, Link } from "react-router-dom";

export const SignUp = () => {

    return (
        <div className="sign-up">
            <h1>Sign Up</h1>
            <Form method="POST" action="/signup">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" />
                
                <button>Sign Up</button>

                <p>Already have an account? <Link to="/signin">Sign In</Link></p>
            </Form>
        </div>
    );
};

export default SignUp;