import {
  BrowserRouter,
  Link,
  useNavigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useStore, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import { Nav } from 'react-bootstrap';
import Input from './Input';
import Header from '../generalComponents/Header';
import { img } from './img';
import { signUpSchema } from '../../schemas/signUp.schemas';

import useAuth from '../../hooks/index';
import { signUpAsyncActions } from '../../redux/asyncActions/signUp.asyncActions';
import UnregistrationError from '../../errors/UnregistrationError';

import './Signup.css';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const initialStateForValidateData = {
    name: '',
    password: '',
    confirmedPassword: '',
  };
  const [validatedData, setValidatedData] = useState(initialStateForValidateData);
  const [errorsValidation, setErrorsValidation] = useState({});
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [existingUsername, setExistingUsername] = useState('');
  const [isStartValidatingInputsInRealTime, setIsStartValidatingInputsInRealTime] = useState(false);
  const [isFirstRequestToServerInThisSignUp, setIsFirstRequestToServerInThisSignUp] = useState(true);
  const userLoadingError = useSelector((state) => state.user.error);
  const userLoading = useSelector((state) => state.user.loading);

  const schema = signUpSchema([validatedData.password]);

  const validate = (data) => {
    try {
      schema.validateSync(
        data,
        { abortEarly: false },
      );
      setErrorsValidation({});
      return true;
    } catch (error) {
      let errorsData = {};

      error.inner.forEach((element) => {
        if (errorsData.hasOwnProperty(element.path)) {
          const errorsByName = errorsData[element.path];
          errorsData = { ...errorsData, [element.path]: [...errorsByName, element.message] };
        } else {
          errorsData = { ...errorsData, [element.path]: [element.message] };
        }
      });
      setErrorsValidation(errorsData);
      return false;
    }
  };

  const sendRequest = async () => {
    const data = { username: validatedData.name, password: validatedData.password };
    dispatch(signUpAsyncActions(data, auth, navigate));
  };

  useEffect(() => {
    if (userLoadingError instanceof UnregistrationError) {
      const nameAlreadyExist = { name: ['errorsTexts.errorValidateUserAlreadyExist'] };
      setIsExistingUser(true);
      setExistingUsername(validatedData.name);
      setErrorsValidation(nameAlreadyExist);
    }

    if (userLoadingError === null) {
      setIsExistingUser(false);
      setExistingUsername('');
      setErrorsValidation({});
    }
  }, [userLoadingError]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validData = validate(validatedData);

    if (isStartValidatingInputsInRealTime === false) {
      setIsStartValidatingInputsInRealTime(true);
    }

    if (validData === true) {
      sendRequest();
    }
  };

  const handleChange = (e) => {
    const newValidateData = { ...validatedData, [e.target.name]: e.target.value };
    setValidatedData({
      ...validatedData,
      [e.target.name]: e.target.value,
    });

    if (isStartValidatingInputsInRealTime === true) {
      if (isExistingUser === true && existingUsername !== e.target.value) {
        setIsExistingUser(false);
      }

      if (isExistingUser === false && existingUsername === e.target.value) {
        setIsExistingUser(true);

        const errorsForName = !errorsValidation.hasOwnProperty('name') ? [] : errorsValidation.name;
        const errorsData = { ...errorsValidation, name: [...errorsForName, 'errorsTexts.errorValidateUserAlreadyExist'] };
        setErrorsValidation(errorsData);
      }
    }
  };

  return (
    <>
      <Header />
      <Card className="text-center Login-card">
        <Row className="Signup__row">
          <Col className="Signup__col-img">
            <img src={img} />
          </Col>

          <Col className="Signup__col-form">
            <Row><Card.Title>{t('registration.header')}</Card.Title></Row>
            <form onSubmit={handleSubmit}>
              <Input
                placeholder={t('registration.name')}
                type="text"
                name="name"
                value={validatedData.name}
                onChange={handleChange}
                error={errorsValidation.name}
              />
              <Input
                placeholder={t('registration.password')}
                type="password"
                name="password"
                value={validatedData.password}
                onChange={handleChange}
                error={errorsValidation.password}
              />
              <Input
                placeholder={t('registration.confirmPassword')}
                type="password"
                name="confirmedPassword"
                value={validatedData.confirmedPassword}
                onChange={handleChange}
                error={errorsValidation.confirmedPassword}
              />
              { userLoading === 'startLoading'
                && (
                <button type="submit" className="Input__button-submit">
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </button>
                )}
              { userLoading !== 'startLoading'
                && <button type="submit" className="Input__button-submit">{t('registration.signUpBtn')}</button>}
            </form>
          </Col>
        </Row>
        <Card.Footer className="text-muted">
          {t('footer.registration')}
          :&nbsp;
          { userLoading === 'startLoading'
            && <Nav.Link as={Link} to="/login" eventKey="disabled" disabled>{t('footer.regLink')}</Nav.Link>}
          { userLoading !== 'startLoading'
            && <Nav.Link as={Link} to="/login">{t('footer.regLink')}</Nav.Link>}
        </Card.Footer>
      </Card>

    </>
  );
};

export default Signup;
