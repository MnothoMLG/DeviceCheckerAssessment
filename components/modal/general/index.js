import { Modal as RnModal, View } from 'react-native'

import React from 'react'

const Modal = ({
  children = null,
  height,
  visible = false,
  width, 
  onRequestClose
}) => {
  const styles = {
    width: width || '100%',
    height : height || '100%',
    display :'flex',
    backgroundColor : null,
    padding: 0,
    alignItems :'center',
    borderWidth :  0,
    justifyContent :'center'
  }
  return(
    <RnModal
      supportedOrientations={['portrait', 'landscape']}

      visible={visible}
      onRequestClose={()=>{
        onRequestClose && onRequestClose()
      }}
    >
      <View  style={styles}>
        {children}
      </View>
    </RnModal>
  )
}
export default Modal