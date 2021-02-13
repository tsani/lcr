import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {Container, Header, Icon, Input} from "semantic-ui-react";

interface AudioProps {
    volume: number;
}

const Audio = ({volume}: AudioProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    if (null !== audioRef.current && audioRef.current.volume !== volume) {
        audioRef.current.volume = volume;
    }

    return (
        <audio ref={audioRef} autoPlay>
            <source src="http://radio.labcoders.club/audio"/>
        </audio>
    );
}

function App() {
    const [volume, setVolume] = useState(0.0);

    useEffect(() => {
        const v = parseFloat(localStorage.getItem('volume') ?? '0');
        setVolume(v);
    }, []);

    const doSetVolume = (v: number) => {
        localStorage.setItem('volume', v.toString());
        setVolume(v);
    };

    return (
        <Container textAlign="center">
            <Header as="h1" icon>
                <Icon name="music"/>
                Labcoders Radio
            </Header>

            <div>
                <Input label="Volume" min="0" max="100" value={volume} onChange={(e) => doSetVolume(parseInt(e.target.value))} type="range"/>
                <Audio volume={volume/100}/>
            </div>
        </Container>
    );
}

export default App;
