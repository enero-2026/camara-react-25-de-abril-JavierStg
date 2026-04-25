import { useState, useRef} from 'react';

import { Button, LogBox, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);  
  const [uri, setUri] = useState(null);
  if (!permission) {
    return <View />;
  }

  // Si el permiso fue denegado, mostramos un botón para solicitarlo
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Necesitamos tu permiso para acceder a la cámara
        </Text>
        <Button onPress={requestPermission} title="Conceder permiso" />
      </View>
    );
  }

  // Alterna entre cámara frontal y trasera
  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }
  async function tomarFoto() {
      if (cameraRef.current) 
        {
        const foto = await cameraRef.current.takePictureAsync();
        setUri(foto.uri);
      }
    }
    
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Voltear cámara</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={tomarFoto}>
            <Text style={styles.text}>Tomar foto</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginBottom: 80,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',    
    padding: 15,
  },
  text: {
    fontSize: 18,               
    fontWeight: 'bold',
    color: 'white',
  },
});