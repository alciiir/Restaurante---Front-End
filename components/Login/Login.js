import FormLogin from '../FormLogin/FormLogin'
import Image from 'next/image'

const Login = () => {
  return (
    <section className="h-screen">
      <div className="is-centered">
        <div className="columns">
          <div className="column">
            <Image
              className="w-full"
              alt="logo"
              src="/static/logo.png"
              width={300}
              height={150}
            />
          </div>
          <div className="column">
            <FormLogin />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
