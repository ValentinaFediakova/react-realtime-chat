import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, useFormikContext } from 'formik';
import * as yup from 'yup';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ButtonBootstrap from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import FormBootstrap from 'react-bootstrap/Form';
import { Nav } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

import Header from '../generalComponents/Header';

import useAuth from '../../hooks/index';
import { loginAsyncAction } from '../../redux/asyncActions/login.asyncActions';
import UnauthorizedError from '../../errors/UnauthorizedError';

import { img } from './img';

import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const userLoading = useSelector((state) => state.user.loading);
  const userLoadingError = useSelector((state) => state.user.error);

  const formikRef = useRef();

  const initialUserValues = {
    username: '',
    password: '',
  };

  const handleOnSubmit = async (values) => {
    dispatch(loginAsyncAction(values, auth, navigate));
  };

  useEffect(() => {
    if (userLoadingError instanceof UnauthorizedError) {
      const error1 = {
        username: 'errorsTexts.errorPasswordMessage',
        password: 'errorsTexts.errorNamePasswordMessage',
      };
      formikRef.current.setSubmitting(false);
      formikRef.current.setErrors(error1);
    }
  }, [userLoadingError]);

  return (
    <>
      <Header />
      <Card className="text-center Login-card">
        <Row>
          <Col className="Login__col-img">
            <img src={img} />
          </Col>

          <Col className="Login__col-form">
            <Row><Card.Title>{t('authorization.header')}</Card.Title></Row>
            <Formik
              innerRef={formikRef}
                // validationSchema={schema}
              onSubmit={handleOnSubmit}
              initialValues={initialUserValues}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <FormBootstrap onSubmit={handleSubmit}>
                  <FormBootstrap.Group as={Col} md="11" className="Login-input-item">
                    <FormBootstrap.Label htmlFor="username">{t('authorization.login')}</FormBootstrap.Label>
                    <FormBootstrap.Control
                      required
                      type="text"
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                          // isValid={touched.username && !errors.username}
                      isInvalid={!!errors.username}
                      id='username'
                    />
                    {/* <FormBootstrap.Control.Feedback type="valid">{t('errorsTexts.noErrors')}</FormBootstrap.Control.Feedback> */}
                    <FormBootstrap.Control.Feedback type="invalid">{t(errors.username)}</FormBootstrap.Control.Feedback>
                  </FormBootstrap.Group>

                  <FormBootstrap.Group as={Col} md="11" className="Login-input-item">
                    <FormBootstrap.Label htmlFor="password">{t('authorization.password')}</FormBootstrap.Label>
                    <FormBootstrap.Control
                      required
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                          // isValid={touched.password && !errors.password}
                      isInvalid={!!errors.password}
                      id="password"
                    />
                    {/* <FormBootstrap.Control.Feedback type="valid">{t('errorsTexts.noErrors')}</FormBootstrap.Control.Feedback> */}
                    <FormBootstrap.Control.Feedback type="invalid">{t(errors.password)}</FormBootstrap.Control.Feedback>
                  </FormBootstrap.Group>
                  <FormBootstrap.Group as={Col} md="11">
                    { userLoading === 'startLoading'
                          && (
                          <ButtonBootstrap variant="outline-primary" className="Login-button" disabled>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          </ButtonBootstrap>
                          )}
                    { userLoading !== 'startLoading'
                          && <ButtonBootstrap variant="outline-primary" className="Login-button" type="submit">{t('authorization.signInBtn')}</ButtonBootstrap>}
                  </FormBootstrap.Group>
                </FormBootstrap>
              )}
            </Formik>
          </Col>
        </Row>
        <Card.Footer className="text-muted">
          {t('footer.authorization')}
          { userLoading === 'startLoading'
            && <Nav.Link as={Link} to="/signup" eventKey="disabled" disabled>{t('footer.authLink')}</Nav.Link>}
          { userLoading !== 'startLoading'
            && <Nav.Link as={Link} to="/signup">{t('footer.authLink')}</Nav.Link>}
        </Card.Footer>
      </Card>
    </>
  );
};

export default Login;
