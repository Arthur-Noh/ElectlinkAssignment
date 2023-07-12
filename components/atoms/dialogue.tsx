import { observer } from 'mobx-react';
import React from 'react';
import { Dimensions, Modal } from 'react-native';
import styled from 'styled-components/native';
import { scaler } from '../../helpers/scaler';
import { Palette } from '../../theme/styles/palette';
import { Base } from '../../theme/styles/themeBase';
import Button from './button';

const Layout = styled.View`
width: ${Dimensions.get('screen').width - 40}px;
border-radius: ${Base.mediumRadius}px;
background-color: ${Palette.white.base};
padding: ${scaler(24)}px;
`;

const Overlay = styled.Pressable`
flex: 1;
justify-content: center;
align-items: center;
background-color: rgba(0, 0, 0, 0.5);
`;

const ButtonLayout = styled.View`
flex-direction: row;
align-items: center;
justify-content: space-between;
`;

const ButtonWrapper = styled.View<{ needGap?: boolean }>`
flex: 1;
margin-left: ${({ needGap }) => needGap ? scaler(16) : 0}px;
`;

interface IDialogue {
    visible: boolean;
    children: React.ReactNode;
    onPressBlur?: () => void;
    onPressCancel?: () => void;
    onPressConfirm?: () => void;
}

const Dialogue: React.FC<IDialogue> = observer((props) => {
    return (
        <Modal
            transparent={true}
            visible={props.visible}
        >
            <Overlay onPress={props.onPressBlur}>
                <Layout>
                    {props.children}
                    <ButtonLayout>
                        { props.onPressCancel && (
                            <ButtonWrapper>
                                <Button
                                    title='취소'
                                    onPress={props.onPressCancel}
                                />
                            </ButtonWrapper>
                        )}
                        <ButtonWrapper needGap={props.onPressCancel !== undefined}>
                            <Button
                                title='확인'
                                onPress={props.onPressConfirm}
                            />
                        </ButtonWrapper>
                    </ButtonLayout>
                </Layout>
            </Overlay>
        </Modal>
    );
});

export default Dialogue;