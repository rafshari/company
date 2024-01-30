import Head from 'next/head'
import Map, { Marker, Popup } from 'react-map-gl'
import React, { useEffect, useState } from 'react'
import SearchBar from '@/components/searchbar/SearchBar'
import axios from 'axios'
import RoomIcon from '@mui/icons-material/RoomOutlined'
import Star from '@mui/icons-material/Star'
import 'mapbox-gl/dist/mapbox-gl.css'

function MapPage() {
  const currentUsername = ''
  if (typeof window !== 'undefined') {
    const myStorage = window.localStorage
    const [currentUsername, setCurrentUsername] = useState(
      myStorage?.getItem('user')
    )
  }
  const [pins, setPins] = useState([])
  const [currentPlaceId, setCurrentPlaceId] = useState(null)
  const [newPlace, setNewPlace] = useState(null)
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [star, setStar] = useState(0)
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [locations, setLocations] = useState(null)
  const [value, setValue] = useState('')
  const [viewport, setViewport] = useState({
    // height: '100vh',
    // width: '100vw',
    latitude: 32,
    longitude: 51,
    zoom: 4.5,
  })

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id)
    setViewport({ ...viewport, latitude: lat, longitude: long })
  }

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat
    setNewPlace({
      lat: latitude,
      long: longitude,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPin = {
      username: currentUsername,
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.long,
    }

    try {
      const res = await axios.post('http://localhost:8800/api/pins', newPin)
      setPins([...pins, res.data])
      setNewPlace(null)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get('http://localhost:8800/api/pins')
        setPins(allPins.data)
      } catch (err) {
        console.log(err)
      }
    }
    getPins()
  }, [])

  const handleLogout = () => {
    setCurrentUsername(null)
    myStorage.removeItem('user')
  }

  const search = async (query) => {
    const url =
      'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
      query +
      '.json?access_token=' +
      process.env.NEXT_PUBLIC_MAPBOX_KEY

    try {
      const res = await axios.get(url)
      setLocations(res.data.features)
    } catch (err) {
      console.log(err)
    }
  }

  const clearForm = () => {
    setValue('')
    if (locations) {
      setLocations(null)
    }
  }

  useEffect(() => {
    if (value !== '') {
      search(value)
    }
  }, [value])

  const searchLocation = (e) => {
    if (locations) {
      const searchedLocation = locations.filter(
        (location) => location.place_name === e.target.innerText
      )
      setViewport({
        ...viewport,
        latitude: searchedLocation[0].geometry.coordinates[1],
        longitude: searchedLocation[0].geometry.coordinates[0],
        zoom: 8,
      })
    }
  }
  return (
    <>
      <Head>
        <title>نمایش شرکتهای حمل و نقل روی نقشه</title>
      </Head>
      <div className='map'>
        <div className='searchbar'>
        <SearchBar
        value={value}
        setValue={setValue}
        locations={locations}
        clearForm={clearForm}
        searchLocation={searchLocation}
          />
          </div>
        <Map
          initialViewState={{ ...viewport }}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
          transitionDuration='200'
          mapStyle='mapbox://styles/mapbox/streets-v9'
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          onDblClick={handleAddClick}
          onClick={clearForm}
        >
          {pins.map((p) => (
            <>
              <Marker
                latitude={p.lat}
                longitude={p.long}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
              >
                <RoomIcon
                  style={{
                    fontSize: 5 * viewport.zoom,
                    color:
                      currentUsername === p.username ? 'tomato' : 'slateblue',
                    cursor: 'pointer',
                  }}
                  className='marker'
                  onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                />
              </Marker>
              {p._id === currentPlaceId && (
                <Popup
                  key={p._id}
                  latitude={p.lat}
                  longitude={p.long}
                  closeButton={true}
                  closeOnClick={false}
                  onClose={() => setCurrentPlaceId(null)}
                  anchor='left'
                >
                  <div className='card'>
                    <label>Place</label>
                    <h4 className='place'>{p.title}</h4>
                    <label>Review</label>
                    <p className='desc'>{p.desc}</p>
                    <label>Rating</label>
                    <div className='stars'>
                      {Array(p.rating).fill(<Star className='star' />)}
                    </div>
                    <label>Information</label>
                    <span className='username'>
                      Created by <b>{p.username}</b>
                    </span>
                    <span className='date'>{p.createdAt}</span>
                  </div>
                </Popup>
              )}
            </>
          ))}
          {newPlace && (
            <>
              <Marker
                latitude={newPlace.lat}
                longitude={newPlace.long}
                offsetLeft={-3.5 * viewport.zoom}
                offsetTop={-7 * viewport.zoom}
              >
                <RoomIcon
                  style={{
                    fontSize: 7 * viewport.zoom,
                    color: 'tomato',
                    cursor: 'pointer',
                  }}
                />
              </Marker>
              <Popup
                latitude={newPlace.lat}
                longitude={newPlace.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setNewPlace(null)}
                anchor='left'
              >
                <div id='addNewPinForm'>
                  <form onSubmit={handleSubmit} className='addNewPinForm'>
                    <label>Title</label>
                    <input
                      placeholder='Enter a title'
                      autoFocus
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <label>Description</label>
                    <textarea
                      placeholder='Say us something about this place.'
                      onChange={(e) => setDesc(e.target.value)}
                    />
                    <label>Rating</label>
                    <select onChange={(e) => setStar(e.target.value)}>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                    </select>
                    <button type='submit' className='submitButton'>
                      Add Pin
                    </button>
                  </form>
                </div>
              </Popup>
            </>
          )}
          {currentUsername ? (
            <button className='button logout' onClick={handleLogout}>
              خروج
            </button>
          ) : (
            <div className='buttons'>
              <button
                className='btn btn-danger mx-1'
                onClick={() => setShowLogin(true)}
              >
                ورود
              </button>
              <button
                className='btn btn-danger'
                onClick={() => setShowRegister(true)}
              >
                ثبت نام
              </button>
            </div>
          )}
          {showRegister && <Register setShowRegister={setShowRegister} />}
          {showLogin && (
            <Login
              setShowLogin={setShowLogin}
              setCurrentUsername={setCurrentUsername}
              myStorage={myStorage}
            />
          )}{' '}
        </Map>
      </div>
    </>
  )
}
export default MapPage
