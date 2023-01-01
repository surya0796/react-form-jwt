import { useEffect, useRef, useState } from "react"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            // const response = await axios.post(REGISTER_URL,
            //     JSON.stringify({ user, pwd }),
            //     {
            //         headers: { 'Content-Type': 'application/json' },
            //         withCredentials: true
            //     }
            // );
            // console.log(response?.data);
            // console.log(response?.accessToken);
            // console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }
    return (
        <section>
            <h2>Register</h2>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">errMsg</p>
            <form  onSubmit={handleSubmit}>
                <div className="form-input">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        autoComplete="off"
                        ref={userRef}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        value={user}
                        onChange={(e) => {
                            setUser(e.target.value)
                            setValidName(USER_REGEX.test(e.target.value))
                        }}
                    />
                    <p id="uidnote" className={user && !validName ? "instructions" : "offscreen"}>4 to 24 characters.Must begin with a letter. Letters, numbers, underscores, hyphens allowed.</p>
                </div>
                <div className="form-input">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        value={pwd}
                        onChange={(e) =>{
                            setPwd(e.target.value)
                            setValidPwd(PWD_REGEX.test(e.target.value))
                            if(matchPwd){
                                setValidMatch(e.target.value === matchPwd)
                            }
                        }}
                            
                    />
                    <p id="pwdnote" className={pwd && !validPwd ? "instructions" : "offscreen"}>8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters: 
                        <span aria-label="exclamation mark">!</span>
                        <span aria-label="at symbol">@</span>
                        <span aria-label="hashtag">#</span>
                        <span aria-label="dollar sign">$</span>
                        <span aria-label="percent">%</span>
                    </p>
                </div>
                <div className="form-input">
                    <label htmlFor="confirm_password">Confirm Password:</label>
                    <input
                        type="text"
                        id="confirm_password"
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="cnfpwdnote"
                        value={matchPwd}
                        onChange={(e) => {
                            setMatchPwd(e.target.value)
                            // const password = document.querySelector("#password").value
                            setValidMatch(pwd === e.target.value)
                        }}
                    />
                    <p id="cnfpwdnote" className={matchPwd && !validMatch ? "instructions" : "offscreen"}>Must match the first password input field.</p>
                </div>
                <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
            </form>
            <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign In</a>
                        </span>
                    </p>
        </section>
    )
}


// aria-live : When content changes after initial load, assistive technology (AT) users may not "see" the changes. Some changes are important. Others are not. The aria-live attribute enables developers to inform the user of updates and choose, based on importance and urgency, whether to immediately, proactively, or passively inform AT users of changes to the content.
// aria-invalid : The aria-invalid attribute is used to indicate that the value entered into an input field is not in a format or a value the application will accept.
