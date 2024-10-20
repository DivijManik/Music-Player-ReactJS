import './App.css';
import HomeImg from './Images/home.svg';
import LibraryImg from './Images/library.svg';
import ExploreImg from './Images/explore.svg';
import LogoImg from './Images/logo_dark.svg';
import SearchImg from './Images/searchNew.svg';
import CastImg from './Images/cast.svg';
import ProfileImg from './Images/account.svg';
import MenuImg from './Images/menu.svg';
import CloseImg from './Images/close.svg';
import AddImg from './Images/add.svg';
import AlbumArt from './Images/albumCover.webp';
import SampleSong from './Music/LoveSong.mp3';

import MusicPlayer from './Components/MusicPlayer';

import { useState, useEffect } from 'react';
import { waitFor } from '@testing-library/react';

import AlbumImgs from './AlbumImages';
import AlbumData from './AlbumData.js';

function App() {

  // Set Current page
  const [CurrentPage, setCurrentPage] = useState('.Home');

  // Highlighting the current page that is selected - by default
  useEffect(() => {
    if (document.querySelector(CurrentPage)) {
      document.querySelector(CurrentPage)
        .classList.add('selected');
    }
  }, [window.innerWidth > 600]);

  // Opening menu from top 
  const [menuOpen, setMenuOpen] = useState(false);
  const handleStateMenu = (e) => {
    setMenuOpen(e);
    if (e == true) {
      setTimeout(() => {
        document.querySelector(CurrentPage + 'Menu')
          .classList.add('selected');
      }, 100);
    }
  };

  const [width_, setWidth] = useState(window.innerWidth);

  // Sets value of window width : width_
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Music Control States
  const [IsPaused, SetIsPaused] = useState(true);

  function PlayPauseFunc() {
    PlayOrPauseSong();
    SetIsPaused(IsMusicPaused);
  }

  const [CurAlbumID, SetCurAlbumID] = useState(-1);

  function NextSong() {
    if (CurAlbumID == -1)
      return;

    var nextID = CurAlbumID < (AlbumData.length - 1) ? CurAlbumID + 1 : 0;
    SetCurAlbumID(nextID);
    PlayNewSong(nextID);
  }
  function PrevSong() {
    if (CurAlbumID == -1)
      return;

    var prevID = CurAlbumID > 0 ? CurAlbumID - 1 : (AlbumData.length - 1);
    SetCurAlbumID(prevID);
    PlayNewSong(prevID);
  }

  //End
  return (
    <div className="App">
      {
        CurrentPage == '.Home' ? <HomePage SetIsPaused={SetIsPaused} SetAlbumID={SetCurAlbumID} /> : CurrentPage == '.Explore' ? <ExplorePage SetIsPaused={SetIsPaused} SetAlbumID={SetCurAlbumID} /> : <OtherPage />
      }

      {
        width_ > 600 ? <LeftBar setCurPage={setCurrentPage} /> : <></>
      }
      <TopBar setMenu={handleStateMenu} />

      {menuOpen && (<MenuDrawer setMenu={handleStateMenu} setCurrentPage={setCurrentPage} />)};

      <MusicPlayer PlayOrPauseFunc={PlayPauseFunc} IsPaused={IsPaused} AlbumID={CurAlbumID} PrevSongFunc={PrevSong} NextSongFunc={NextSong} />
    </div>
  );
}

function TopBar({ setMenu }) {

  return (
    <div className='TopBar'>
      <button className='Menu' onClick={() => setMenu(true)}><div><img src={MenuImg}></img></div></button>
      <img className='Logo' src={LogoImg} ></img>
      {/* TopBar Left btns  */}
      <button className='Search'><img src={SearchImg}></img></button>
      <button className='Cast'><img src={CastImg}></img></button>
      <button className='Profile'><img src={ProfileImg}></img></button>
    </div >

  );
}

// Used by LeftBar & MenuBar
var btnClasses = ['.Home', '.Explore', '.Library'];
function CurrentBtnSelect_LeftBar(curBtn) {

  for (let i = 0; i < btnClasses.length; i++) {
    if (document.querySelector(btnClasses[i])) {
      if (i == curBtn) {
        document.querySelector(btnClasses[i])
          .classList.add('selected');
        document.querySelector(btnClasses[i])
          .classList.remove('hover');
      }
      else {
        document.querySelector(btnClasses[i])
          .classList.remove('selected');
        document.querySelector(btnClasses[i])
          .classList.add('hover');
      }
    }
  }
}

function LeftBar({ setCurPage }) {

  function CurrentBtnSelected(curBtn) {
    setCurPage(btnClasses[curBtn]);

    CurrentBtnSelect_LeftBar(curBtn);
  }

  return (
    <div className='LeftBar'>
      <button className='Home' onClick={() => CurrentBtnSelected(0)}><img src={HomeImg}></img>Home</button>
      <button className='Explore' onClick={() => CurrentBtnSelected(1)}><img src={ExploreImg}></img>Explore</button>
      <button className='Library' onClick={() => CurrentBtnSelected(2)}><img src={LibraryImg}></img>Library</button>
    </div>
  )
}

function MenuDrawer({ setMenu, setCurrentPage }) {

  // Close Sidebar with animation
  function toggleSidebar() {
    document.querySelector('.MenuDrawer')
      .classList.toggle('closed');

    // Timeout for animation to play
    setTimeout(() => {
      setMenu(false);
    }, 200);
  }

  function OnMenuBtnClick(curBtn) {
    setCurrentPage(btnClasses[curBtn])
    CurrentBtnSelect_LeftBar(curBtn);

    for (let i = 0; i < btnClasses.length; i++) {
      if (i == curBtn) {
        document.querySelector(btnClasses[i] + 'Menu')
          .classList.add('selected');
      }
      else {
        document.querySelector(btnClasses[i] + 'Menu')
          .classList.remove('selected');
      }
    }
  }

  return (
    <div className='MenuBackground'>
      <div onClick={() => setMenu(false)}></div>
      <div className='MenuDrawer'>
        <div className='MenuTop'>
          <button className='CloseMenu' onClick={() => toggleSidebar()}><img src={CloseImg}></img></button>
          <img className='MenuLogo' src={LogoImg} ></img>
        </div>
        <button className='HomeMenu' onClick={() => OnMenuBtnClick(0)}><img src={HomeImg}></img><p>Home</p></button>
        <button className='ExploreMenu' onClick={() => OnMenuBtnClick(1)} ><img src={ExploreImg}></img><p>Explore</p></button>
        <button className='LibraryMenu' onClick={() => OnMenuBtnClick(2)}><img src={LibraryImg}></img><p>Library</p></button>
        <hr></hr>
        <button className='PlaylistBtn'><img src={AddImg}></img><p>New Playlist</p></button>
      </div>
    </ div>
  )
}

var audio;
let IsMusicPaused = true;

function TrackDetails({ AlbumID = 0, SetIsPaused, SetAlbumID }) {

  const start = () => {
    //We are pausing & moving that song to start using currentTime
    // Because this function is called when a music card is clicked
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    // Set the new song
    audio = new Audio(AlbumData[AlbumID][2]);

    //audio.play();
    PlayOrPauseSong();
    SetIsPaused(IsMusicPaused);
    SetAlbumID(AlbumID);
  }

  return (
    <div className='TrackIcon'>
      <div className='TrackImg'>

        <button onClick={start}>
          <img src={AlbumImgs[AlbumID]}></img>
        </button>
      </div>
      <h2>{AlbumData[AlbumID][0]}</h2><p>{AlbumData[AlbumID][1]}</p>
    </div>
  )
}

function SongCategory({ CategoryName }) {
  return (
    <div className='SongCategory'>
      <p>{CategoryName}</p>
    </div>
  )
}

// Music Palyer Controls

// Used at Prev and Next song - controls
function PlayNewSong(AlbumID) {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  // Set the new song
  audio = new Audio(AlbumData[AlbumID][2]);

  //audio.play();
  PlayOrPauseSong();
}

// Called when play/Pause button is clicked in music player
function PlayOrPauseSong() {
  if (!audio)
    return;

  if (!audio.paused) {
    audio.pause();
    IsMusicPaused = true;
  }
  else {
    audio.play();
    IsMusicPaused = false;
  }
}
//End

function HomePage({ SetIsPaused, SetAlbumID }) {

  return (
    <div className='HomeContent'>
      <div className='CategoryParent'>
        <SongCategory CategoryName='Podcast' />
        <SongCategory CategoryName='Feel Good' />
        <SongCategory CategoryName='Calm' />
        <SongCategory CategoryName='Romance' />
        <SongCategory CategoryName='Workout' />
        <SongCategory CategoryName='Party' />
        <SongCategory CategoryName='Focus' />
        <SongCategory CategoryName='Sad' />
        <SongCategory CategoryName='Sleep' />
        <SongCategory CategoryName='Podcast' />
        <SongCategory CategoryName='Feel Good' />
        <SongCategory CategoryName='Calm' />
        <SongCategory CategoryName='Romance' />
        <SongCategory CategoryName='Workout' />
        <SongCategory CategoryName='Party' />
        <SongCategory CategoryName='Focus' />
        <SongCategory CategoryName='Sad' />
        <SongCategory CategoryName='Sleep' />
      </div>

      {/* TRACK DETAILS CAN BE REPLACED WITH AN API */}
      <div>
        <h2 className='Content Heading'>Listen Again</h2>
        <div className='TrackParent'>
          <TrackDetails AlbumID={1} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={0} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={2} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={3} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={4} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={5} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={6} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
        </div>
      </div>

      <div>
        <h2 className='Content Heading'>Top Songs</h2>
        <div className='TrackParent'>
          <TrackDetails AlbumID={6} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={5} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={4} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={3} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={1} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={2} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={0} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
        </div>
      </div>

      <div>
        <h2 className='Content Heading'>Mixed For You</h2>
        <div className='TrackParent'>
          <TrackDetails AlbumID={2} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={6} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={0} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={1} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={3} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={5} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={4} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
        </div>

        <div>
          <h2 className='Content Heading'>Global Top</h2>
          <div className='TrackParent'>
            <TrackDetails AlbumID={4} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
            <TrackDetails AlbumID={2} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
            <TrackDetails AlbumID={0} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
            <TrackDetails AlbumID={5} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
            <TrackDetails AlbumID={3} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
            <TrackDetails AlbumID={6} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
            <TrackDetails AlbumID={1} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          </div>
        </div>
      </div>
      <br /><br /><br />
    </div>
  );
}

function ExplorePage({ SetIsPaused, SetAlbumID }) {
  return (
    <div className='ExplorePageContent'>
      <h1>New albums and singles</h1>
      <p>Checkout the latest releases</p>
      <div>
        <div className='NewTrackParent'>
          <TrackDetails AlbumID={4} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={2} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={0} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={6} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={1} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={3} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
          <TrackDetails AlbumID={5} SetIsPaused={SetIsPaused} SetAlbumID={SetAlbumID} />
        </div>
      </div>
      <br /><br /><br />
    </div>
  )
}

function OtherPage() {
  return (
    <div className='OtherPageContent'>
      <h2>Made With</h2><h1>♥️</h1>
      <br /><br /><br />
      <p>by</p><h1>DIVIJ MANIK</h1>
    </div>
  )
}

export default App;
