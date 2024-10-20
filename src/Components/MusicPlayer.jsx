import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './MusicPlayer.css';

import DefaultAlbumArt from './Images/DefaultAlbumArt.png';  //'../Images/albumCover.webp';
import Play from './Images/play.svg';
import Pause from './Images/pause.svg';
import SkipNext from './Images/skip-next.svg';
import SkipPrev from './Images/skip-prev.svg';

import AlbumImgs from '../AlbumImages';
import AlbumData from '../AlbumData.js';

function MusicPlayer({ PlayOrPauseFunc, IsPaused, AlbumID = -1, NextSongFunc, PrevSongFunc }) {

    function PlayPauseHandle() {
        PlayOrPauseFunc();
    }

    return (
        <div className='MusicPlayer'>
            <div className='SongImage'>
                <img src={AlbumID == -1 ? DefaultAlbumArt : AlbumImgs[AlbumID]}></img>
            </div>
            <div className='SongDetails'>

                <h2>{AlbumID == -1 ? "Nothing Playing" : AlbumData[AlbumID][0]}</h2>
                <p>{AlbumID == -1 ? "-" : AlbumData[AlbumID][1]}</p>
            </div>
            <div className='Btns'>
                <button className='Prev'><img src={SkipPrev} onClick={() => PrevSongFunc()} /></button>
                <button className='Play'><img src={IsPaused ? Play : Pause} onClick={() => PlayPauseHandle()} /></button>
                <button className='Next'><img src={SkipNext} onClick={() => NextSongFunc()} /></button>
            </div>
        </div>
    );
}



export default MusicPlayer;