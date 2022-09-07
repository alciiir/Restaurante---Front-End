import {useState} from 'react'
import Modal from '../Modal/Modal'
import axios from 'axios'
import {getCookie} from 'cookies-next'
import buildUrl from '../../utils/buildService'
import getApiUrl from '../../utils/getApiUrl'
import {DOMAINS, FORMS_INPUTS, HTTP_STATUSES} from '../../constants/appConstants'
import useCreateForm from '../../utils/useCreateForm'

const CreateUser = ({state, actions}) => {
  const [modalToggle, setModalToggle] = useState(false)
  const [modalState, setModalState] = useState({})
  const {getValues, CreateForm} = useCreateForm()
  const buttonClickHandler = () => {
    setModalToggle(!modalToggle)
  }
  const handleCloseModal = () => {
    setModalToggle(false)
  }
  const onSubmit = async () => {
    const createUserApi = buildUrl(getApiUrl(DOMAINS.USERS).createUser)
    const token = getCookie('JWT_TOKEN')
    const requestBody = getValues()
    const res = await axios.post(createUserApi, requestBody, {
      headers: {accept: 'application/json', Authorization: `Bearer ${token}`},
    })
    if (res.status === HTTP_STATUSES.CREATED) {
      actions.setReloadComponent(true)
      handleCloseModal()
    }
  }
  return (
    <div
      id="create-user"
      className="panel-heading is-flex is-align-items-flex-end is-justify-content-flex-center"
    >
      <button
        className="button is-large is-responsive is-fullwidth is-info is-light"
        onClick={buttonClickHandler}
      >
        Crear Usuario
      </button>
      {modalToggle && (
        <Modal
          title={'Crear Usuario'}
          toggle={modalToggle}
          isButtonValid={true}
          toggleOnClick={handleCloseModal}
          onClick={onSubmit}
        >
          <CreateForm createFormProps={FORMS_INPUTS[DOMAINS.USERS]} />
        </Modal>
      )}
    </div>
  )
}

export default CreateUser
