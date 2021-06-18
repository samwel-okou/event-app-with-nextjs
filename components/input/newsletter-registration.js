import classes from './newsletter-registration.module.css';
import { useRef, useContext } from 'react';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    console.log('was clicked');
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      title: 'signing up...',
      message: 'Registration for newsletter.!',
      status: 'pending',
    });

    const reqBody = { email: enteredEmail };

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Successfully registered for newsletter.!',
          status: 'success',
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'error',
          message: error.message || 'Something went wrong.!',
          status: 'error',
        });
      });
  }

  function loadFeedbackHandler() {
    fetch('/api/newsletter')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        response.json().then((data) => {
          throw new error(data.message || 'Something went wrong.!');
        });
      })
      .then((data) => {
        setFeedbackItems(data.feedback);
      });

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button onClick={loadFeedbackHandler}>Register</button>
          {/* {feedbackItems.map((item) => (
            <li key={item.id}>{item.email}</li>
          ))} */}
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
