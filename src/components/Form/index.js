import React, {useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, Vibration, Keyboard, Pressable, FlatList } from 'react-native'
import styles from './style'
import ResultIMC from '../Form/Resultimc'

export default function Form() {

  const [height, setHeight] = useState(null)
  const [weight, setWeight] = useState(null)
  const [messageImc, setMessageImc] = useState("Preencha o peso e a altura")
  const [imc, setImc] = useState(null)
  const [textButton, setTextButton] = useState('Calcular IMC')
  const [errorMessage, setErrorMessage] = useState(null)
  const [imcList, setImcList] = useState([])

  function imcCalculator(){
    let heightFormat = height.replace(",",".")
    let totalImc = (weight/(heightFormat*heightFormat)).toFixed(2)
    setImcList((arr) => [...arr, {id: new Date().getTime(), imc: totalImc}])
    setImc(totalImc)
  }

  function verificationImc(){
    if(imc == null){
      Vibration.vibrate()
      setErrorMessage("Campo obrigatório*")
    }
  }

  function validationImc(){
    if(weight != null && height != null){
      imcCalculator()
      setHeight(null)
      setWeight(null)
      setErrorMessage(null)
      setMessageImc("Seu IMC é igual: ")
      setTextButton("Calcular Novamente")
    }else{
      verificationImc()
      setImc(null)
      setTextButton("Calcular IMC")
      setMessageImc("Preencha o peso e a altura")
    }
  }

  return (
    <View style={styles.formContext}>
        {imc == null ? 
          <Pressable onPress={Keyboard.dismiss} style={styles.form}>

          <Text style={styles.formLabel}>Altura</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            onChangeText={setHeight}
            value={height}
            placeholder='Ex: 1.75'
            keyboardType='numeric'
            style={styles.input}
          />

          <Text style={styles.formLabel}>Peso</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            onChangeText={setWeight}
            value={weight}
            placeholder='Ex: 75.365'
            keyboardType='numeric'
            style={styles.input}
          />

          <TouchableOpacity
            onPress={()=> validationImc()}
            onPressOut={Keyboard.dismiss}
            style={styles.buttonCalculator}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>

        </Pressable>
      : 
        <View style={styles.exhibitionResultImc}>
          <ResultIMC messageResultImc={messageImc} resultImc={imc} />
          <TouchableOpacity
            onPress={()=> validationImc()}
            onPressOut={Keyboard.dismiss}
            style={styles.buttonCalculator}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </View>
      }
      <FlatList
        style={styles.listImcs}
        data={imcList.reverse()}
        key={() => Date.now().toString()}
        renderItem={({item}) => {
          return (
            <Text style={styles.resultImcItem}>
              <Text style={styles.textResultItemList}>Resultado IMC: </Text>
              {item.imc}
            </Text>
          )
        }}
        keyExtractor={(item) => {
          item.id
        }}
      />
    </View>
  )
}