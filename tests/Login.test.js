import React from 'react';
import renderer from 'react-test-renderer';
import axios from "../src/api/axios";
import LoginScreen from "../src/screens/LoginScreen"

jest.mock('axios');

describe('<LoginScreen />', () => {
  it('should handle successful login', () => {
    const mockNavigation = { reset: jest.fn() };

    // Mockear la respuesta exitosa del servidor
    const mockResponse = {
      data: {
        token: 'dummyToken',
        id: 'dummyId',
        mod: 'dummyMod',
      },
    };
    axios.post.mockResolvedValue(mockResponse);

    // Renderizar el componente
    const component = renderer.create(<LoginScreen navigation={mockNavigation} />);
    const instance = component.getInstance();

    // Modificar los valores de los campos de correo electrónico y contraseña
    instance.setEmail('example@example.com');
    instance.setPassword('password123');

    // Llamar a la función handleLogin
    const handleLoginResult = instance.handleLogin();

    // Verificar que handleLogin devuelva true
    expect(handleLoginResult).toBe(true);

    // Obtener el botón de inicio de sesión y llamar a su función onPress
    const button = component.root.find((el) => el.props.testID === 'login-button');
    button.props.onPress();

    // Verificar que se haya llamado a la función axios.post con los valores correctos
    expect(axios.post).toHaveBeenCalledWith('/usuarios/login', {
      email: 'example@example.com',
      password: 'password123',
    });

    // Verificar que se haya llamado a las funciones de almacenamiento adecuadas
    expect(storeToken).toHaveBeenCalledWith('dummyToken');
    expect(storeUserId).toHaveBeenCalledWith('dummyId');
    expect(storeModStatus).toHaveBeenCalledWith('dummyMod');
    expect(mockNavigation.reset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'Tabs' }],
    });
  });
});
