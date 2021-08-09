import React from 'react'
import { Text } from 'react-native'
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Background from '../components/Background'
import Styles from '../core/Styles'
import Button from '../components/Button'
// import UploadButton from '../components/UploadButton'
// import DropdownMenu from '../components/DropdownMenu'

export default function ClaimExpenses({ navigation }) {
  return (
    <Background>
      <Text style={Styles.header}>Claim Expenses</Text>
        <label>
          {/* Expense Type:<DropdownMenu /> */}
          Location:<input type="text" />
          {/* Upload Bills:<UploadButton /> */}
          Amount (Rs.):<input type="text" />
          {/* Comments:<TextareaAutosize aria-label="minimum height" minRows={3} /> */}
        </label>


      <Button mode="contained" onPress={() => { alert('Submitted') }}>Submit</Button>
      <Button mode="contained" onPress={() => { alert('Cancelled') }}>Cancel</Button>
    </Background>
  )
}
// import React from "react";
// import styled from "styled-components";

// import useInput from ".hooks/useInput";

// const SignInForm = () => {
//     const email = useInput("");
//     const password = useInput("");

//     const submitForm = (event) => {
//         event.preventDefault();
//         console.log("email", email.value);
//         console.log("password", password.value);
//     };

//     return (
//         <FormWrapper onSubmit={submitForm}>
//             <Title>Sign in</Title>
//             <Input placeholder="Email" {...email} />
//             <Input placeholder="Password" type="password" {...password} />
//             <Button type="submit">Sign in</Button>
//         </FormWrapper>
//     );
// };

// export default SignInForm;

// const FormWrapper = styled.form`
//     display: grid;
//     justify-content: center;
//     gap: 20px;
//     padding-bottom: 50px;
// `;

// const Title = styled.h1`
//     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
//     font-style: normal;
//     font-weight: bold;
//     font-size: 40px;
//     line-height: 48px;
//     color: #ffffff;
//     text-align: center;
// `;

// const Input = styled.input`
//     background: rgba(255, 255, 255, 0.2);
//     border-radius: 30px;
//     padding: 10px 20px;
//     background-blend-mode: overlay;
//     background: rgba(255, 255, 255, 0.2);
//     box-shadow: 0px 20px 40px rgba(31, 47, 71, 0.25), 0px 1px 5px rgba(0, 0, 0, 0.1), inset 0 0 0 0.5px rgba(255, 255, 255, 0.4);
//     border: 1px solid rgba(250, 250, 250, 0.4);

//     :focus {
//         outline: none;
//     }
// `;

// const Button = styled.button`
//     background: linear-gradient(91.4deg, #2fb8ff 0%, #9eecd9 100%);
//     padding: 12px 0;
//     width: 200px;
//     border: none;
//     border-radius: 30px;
//     color: white;
//     font-weight: bold;
//     font-family: Segoe UI, sans-serif;
//     cursor: pointer;
//     :focus {
//         outline: none;
//     }
// `;