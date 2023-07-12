import React, { useRef, useState } from 'react';
import styled from 'styled-components/native';
import Lottie from 'lottie-react-native';
import Button from '../../components/atoms/button';
import { Palette } from '../../theme/styles/palette';
import PlayImage from '../../assets/common/play.png';
import PauseImage from '../../assets/common/pause.png';
import ResetImage from '../../assets/common/reset.png';
import { scaler } from '../../helpers/scaler';
import { Base } from '../../theme/styles/themeBase';

const Layout = styled.View`
flex: 1;
background-color: ${Palette.white.base};
padding: ${scaler(12)}px ${scaler(12)}px 0 ${scaler(12)}px;
`;

const LottieLayout = styled.View`
height: ${scaler(400)}px;
background-color: ${Palette.gray[100]};
border-width: ${scaler(4)}px;
border-radius: ${Base.largeRadius}px;
border-color: ${Palette.black.base};
margin-bottom: ${scaler(12)}px;
`;

const ButtonLayout = styled.View`
flex-direction: row;
justify-content: center;
`;

const ButtonWrapper = styled.View`
margin-right: ${scaler(8)}px;
`;

const Action = () => {
    const [ isPaused, setIsPaused ] = useState<boolean>(true);
    const lottieRef = useRef<Lottie>(null);

    return (
        <Layout>
            <LottieLayout>
                <Lottie
                    ref={lottieRef}
                    source={require('../../assets/animation/Lottie.json')}
                    loop={false}
                    onAnimationFinish={(isCancel) => setIsPaused(!isCancel)}
                />
            </LottieLayout>
            <ButtonLayout>
                <ButtonWrapper>
                { isPaused ? (
                    <Button
                        imageSource={PlayImage}
                        onPress={() => {
                            lottieRef.current?.play();
                            setIsPaused(false);
                        }}
                    />
                ) : (
                    <Button
                        imageSource={PauseImage}
                        onPress={() => {
                            lottieRef.current?.pause();
                            setIsPaused(true);
                        }}
                    />
                )}
                </ButtonWrapper>
                <Button
                    imageSource={ResetImage}
                    imageSize={35}
                    onPress={() => {
                        lottieRef.current?.reset();
                        setIsPaused(true);
                    }}
                />
            </ButtonLayout>
        </Layout>
    );
};

export default Action;