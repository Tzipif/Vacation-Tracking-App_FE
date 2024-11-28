import React from 'react'
import DeleteButton from './deleteButton'
import EditButton from './editButton'
import { vacationType } from '../../types/vocationType'

type Props = {
    vocation : vacationType;
    onDeleteVocation: (vocationId: number) => void;
}

const ShowAdminButtons = (props: Props) => {

  return (
    <div style={{
        position: 'absolute'
    }}>
        <DeleteButton vacation={props.vocation} onDeleteVocation={props.onDeleteVocation}/>
        <EditButton vacation={props.vocation}/>
    </div>
  )
}

export default ShowAdminButtons