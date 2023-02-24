import { Form, Link } from 'react-router-dom';

export const SignIn = () => {

    return (
        <div className="sign-in">
            <h1>Sign In</h1>
            <Form method="POST" action="/signin">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />

                <button>Sign In</button>

                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                
            </Form>
        </div>
    );
}

export default SignIn;
