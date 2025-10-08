'use client';

import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Image from 'next/image';
import Ceo from '../../public/images/ceo.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';

function RegisterForm() {
  const router = useRouter();
  const [dislayname, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
      const token = localStorage.getItem('analgo_token');
      if (token) {
         window.location.href = '/dashboard';
      }
    }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      setError('ReCAPTCHA not yet loaded');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords must match');
      return;
    }
    try {
      const token = await executeRecaptcha('register');
      const response = await axios.post(process.env.NEXT_PUBLIC_ENDPOINT_ANALGO_RECAPTCHA!, { token });
      if (response.data.success) {
        await axios.post(process.env.NEXT_PUBLIC_ENDPOINT_ANALGO_REGISTERUSER!, {
          name: dislayname,
          email: email,
          password: password
        });
        setSuccess('Registration successful!');
        setError('');
        router.push('/login');
      } else {
        setError('ReCAPTCHA verification failed!');
      }
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className='col-12 d-md-flex mb-2 mt-5 p-3'>
      <div className='row'>
        <div className='col-md-7 col-sm-12 mb-2 pr-3'>
            <div className='col-sm-12'>
              <p className='h3'>Join Analgo for free and improve your software experience.</p>
              <p>Unlock the full potential of AI. Design intelligent systems that set your teams up for success, accelerate action, and give you clear insights on what works and what needs improvement.</p>
              <p dir="rtl">كيف تحقق أقصى استفادة من الذكاء الاصطناعي في أعمالك؟ أنشئ أنظمة ذكية تُمهّد الطريق للمستخدمين والمؤسسات للنجاح. تعرّف على ما يُحدث فرقًا، وزد من سرعة اتخاذ القرارات، واحصل على مقاييس تُبيّن ما يُجدي نفعًا وما لا يُجدي نفعًا.</p>
            </div>
             <div className='col-12 m-2 d-flex ceo'>
                <Image
                src={Ceo}
                alt="Ben Mansour Marouan"
                width={150}
                height={50}
                priority={true}
                />
              <div className='row d-md-block'>
                <p className='title-ceo'>Ben Mansour Marouan<br/><span>CEO-FOUNDER</span></p>
                <p>
                    <a href="https://www.linkedin.com/in/php-magento-drupal-developer/" target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faLinkedin} size="2x" style={{ color: '#0A66C2' }} />
                    </a>
                </p>
              </div>
            </div>
        </div>
        <div className="col-md-3 col-sm-12 offset-md-1 p-3 register-form">
          {error && <div className="text-danger mb-2">{error}</div>}
          {success && <div className="text-success mb-2">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                  type="text"
                  placeholder="Display name"
                  className="form-control"
                  value={dislayname}
                  onChange={e => setDisplayName(e.target.value)}
                  required
              />
            </div>
            <div className="mb-3">
            <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            </div>
            <div className="mb-3">
            <input
                type="password"
                placeholder="Password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            </div>
            <div className="mb-3">
            <input
                type="password"
                placeholder="Confirm Password"
                className="form-control"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
            />
            </div>
              <button type="submit" className="btn btn-primary pt-2">
                  Sign up
              </button>
          </form>
          <p className="mt-2">
            <a href="/login">Already have an account? Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
 return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}>
      <RegisterForm />
    </GoogleReCaptchaProvider>
  );
}
