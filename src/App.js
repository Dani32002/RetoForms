import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {

 const [formValues, setFormValues] = useState({email:"", password:"", favClass:"1"})
 const [validationStates, setValidationStates] = useState({emailState: true, passwordState: true});

const handleEmailChange = ((e) => {
  if (!validationStates.emailState) {
    validateEmail();
  }
  setFormValues({...formValues, email: e.target.value})
});

const handlePasswordChange = ((e) => {
  if (!validationStates.passwordState) {
    validatePassword();
  }
  setFormValues({...formValues, password: e.target.value})
});

const validatePassword = () => {
  if (formValues.password < 9 || !/[a-zA-Z]/.test(formValues.password) || !/\d/.test(formValues.password)) {
    setValidationStates({...validationStates, passwordState: false});
    return false;
  } else {
    setValidationStates({...validationStates, passwordState: true});
    return true;
  }
}

const handleSelectChange = ((e) => {
  setFormValues({...formValues, favClass: e.target.value})
});

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  setValidationStates({...validationStates, emailState: emailRegex.test(formValues.email)});
  return emailRegex.test(formValues.email);
}

const clickSubmit = (() => {
  const emailValid = validateEmail();
  const passwordValid = validatePassword();
  if (emailValid && passwordValid) {
    alert(JSON.stringify(formValues));
  }
})


    


return (


  <div>
    <h1>Ejemplo de formularios!</h1>
  
    <Form>
    <Form.Group className="mb-6" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={formValues.email} isInvalid = {!validationStates.emailState} onBlur={validateEmail}/>
      { !validationStates.emailState && <Form.Text className="text-muted">Your email should follow an established format</Form.Text>}
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={formValues.password} isInvalid={!validationStates.passwordState} onBlur={validatePassword}/>
      { !validationStates.passwordState && <Form.Text className="text-muted">Your password should be have numbers and letters and should be at least 9 char long</Form.Text>}
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Label>Favorite Class</Form.Label>
      <Form.Select onChange={handleSelectChange}>
        <option value="1">ISIS3710</option>
        <option value="2">Programación con tecnologias web</option>
      </Form.Select>
    </Form.Group>
    <Button variant="primary" onClick={clickSubmit} disabled={!validationStates.emailState || !validationStates.passwordState}>
      Submit
    </Button>
  </Form>
  </div>
 );
}

export default App;
