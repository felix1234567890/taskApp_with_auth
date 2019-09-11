import React from 'react';
import { AuthContext } from '../context/authContext';
import keys from '../keys';

const Login = ({ history }) => {
  const { dispatch } = React.useContext(AuthContext);
  const [data, setData] = React.useState({
    email: '',
    password: '',
    loading: false,
    errors: {
      email: true,
      password: true,
      signup: null
    }
  });
  const onChangeHandler = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };
  React.useEffect(() => {
    validateFields(data.email, data.password);
  }, [data.email, data.password]);
  const validateFields = (email, password) => {
    let errors = {};
    const regexp = new RegExp(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    errors.email = !regexp.test(email);
    errors.password = password.length <= 6;

    setData({
      ...data,
      errors
    });
  };
  const onSubmitHandler = (e, history) => {
    e.preventDefault();
    setData({
      ...data,
      loading: true
    });

    fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${keys.API_KEY}
      `,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          returnSecureToken: true
        })
      }
    )
      .then(res => {
        if (!res.ok) throw res;
        return res.json();
      })
      .then(json => {
        setData({
          ...data,
          loading: false
        });
        dispatch({
          type: 'LOGIN',
          token: json.idToken
        });
        history.push('/tasks');
      })
      .catch(e => {
        setData({
          ...data,
          errors: {
            ...data.errors,
            signup: e.message
          }
        });
      });
  };
  const {
    errors: { email, password }
  } = data;

  return (
    <form style={form} onSubmit={e => onSubmitHandler(e, history)}>
      <div className="form-group">
        <label htmlFor="email">Email adresa</label>
        <input
          id="email"
          type="email"
          name="email"
          className={`form-control ${email ? 'is-invalid' : 'is-valid'}`}
          placeholder="Unesi email adresu"
          value={data.email}
          onChange={onChangeHandler}
        />
        <div className={` ${email ? 'invalid-feedback' : 'valid-feedback'}`}>
          {email ? 'Ovo nije valjana email adresa' : 'OK'}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="password">Lozinka</label>
        <input
          id="password"
          type="password"
          name="password"
          className={`form-control ${password ? 'is-invalid' : 'is-valid'}`}
          placeholder="Unesi lozinku"
          value={data.password}
          onChange={onChangeHandler}
        />
        <div className={` ${password ? 'invalid-feedback' : 'valid-feedback'}`}>
          {password ? 'Lozinka mora biti duža od 6 znakova' : 'OK'}
        </div>
      </div>
      <button
        disabled={email || password || data.loading}
        type="submit"
        className="btn btn-primary"
      >
        {data.loading ? 'Šaljem' : 'Pošalji'}
      </button>
    </form>
  );
};

export default Login;

const form = {
  margin: '15px auto',
  width: '50%'
};
