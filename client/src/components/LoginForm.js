"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// see SignupForm.js for comments
const react_1 = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const auth_1 = __importDefault(require("../utils/auth"));
const client_1 = require("@apollo/client");
const mutations_1 = require("../utils/mutations");
// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const LoginForm = ({}) => {
    const [loginUser] = (0, client_1.useMutation)(mutations_1.LOGIN_USER);
    const [userFormData, setUserFormData] = (0, react_1.useState)({ username: '', email: '', password: '', savedBooks: [] });
    const [validated] = (0, react_1.useState)(false);
    const [showAlert, setShowAlert] = (0, react_1.useState)(false);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData(Object.assign(Object.assign({}, userFormData), { [name]: value }));
    };
    const handleFormSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        // check if form has everything (as per react-bootstrap docs)
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        try {
            const response = yield loginUser({
                variables: {
                    email: userFormData.email,
                    password: userFormData.password
                }
            });
            if (!(response === null || response === void 0 ? void 0 : response.data)) {
                throw new Error('something went wrong!');
            }
            console.log(response);
            const { token } = response.data.login;
            auth_1.default.login(token);
        }
        catch (err) {
            console.error(err);
            setShowAlert(true);
        }
        setUserFormData({
            username: '',
            email: '',
            password: '',
            savedBooks: [],
        });
    });
    return (<>
      <react_bootstrap_1.Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <react_bootstrap_1.Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </react_bootstrap_1.Alert>
        <react_bootstrap_1.Form.Group className='mb-3'>
          <react_bootstrap_1.Form.Label htmlFor='email'>Email</react_bootstrap_1.Form.Label>
          <react_bootstrap_1.Form.Control type='text' placeholder='Your email' name='email' onChange={handleInputChange} value={userFormData.email || ''} required/>
          <react_bootstrap_1.Form.Control.Feedback type='invalid'>Email is required!</react_bootstrap_1.Form.Control.Feedback>
        </react_bootstrap_1.Form.Group>

        <react_bootstrap_1.Form.Group className='mb-3'>
          <react_bootstrap_1.Form.Label htmlFor='password'>Password</react_bootstrap_1.Form.Label>
          <react_bootstrap_1.Form.Control type='password' placeholder='Your password' name='password' onChange={handleInputChange} value={userFormData.password || ''} required/>
          <react_bootstrap_1.Form.Control.Feedback type='invalid'>Password is required!</react_bootstrap_1.Form.Control.Feedback>
        </react_bootstrap_1.Form.Group>
        <react_bootstrap_1.Button disabled={!(userFormData.email && userFormData.password)} type='submit' variant='success'>
          Submit
        </react_bootstrap_1.Button>
      </react_bootstrap_1.Form>
    </>);
};
exports.default = LoginForm;
