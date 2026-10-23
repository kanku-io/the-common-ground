import React from 'react'
import { supabase } from '../supabaseClient'

const artists = [
  { id: 1, name: 'Mister X', role: 'Visual Artist', src: null },
  { id: 2, name: 'Tobi Nzama', role: 'Visual Artist', src: null },
  { id: 3, name: 'Ceethekreator', role: 'Visual Artist', src: null },
  { id: 4, name: 'Khaya Mtungwa', role: 'Visual Artist', src: null },
]

// size: 'big' | 'tall' | 'wide' | 'normal'
const photos = [
  { id: 1, src: null, name: 'common-ground-1.jpg', size: 'big' },
  { id: 2, src: null, name: 'common-ground-2.jpg', size: 'normal' },
  { id: 3, src: null, name: 'common-ground-3.jpg', size: 'tall' },
  { id: 4, src: null, name: 'common-ground-4.jpg', size: 'normal' },
  { id: 5, src: null, name: 'common-ground-5.jpg', size: 'wide' },
  { id: 6, src: null, name: 'common-ground-6.jpg', size: 'normal' },
  { id: 7, src: null, name: 'common-ground-7.jpg', size: 'tall' },
  { id: 8, src: null, name: 'common-ground-8.jpg', size: 'normal' },
  { id: 9, src: null, name: 'common-ground-9.jpg', size: 'normal' },
]

const handleDownload = async (photo) => {
  try {
    const res = await fetch(photo.src)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = photo.name
    a.click()
    URL.revokeObjectURL(url)
  } catch {
    window.open(photo.src, '_blank')
  }
}

const Gallery = () => {
  return (
    <div className='site'>
      <nav className='nav'>
        <span className='nav-logo'>The Common Ground</span>
        <div className='nav-links'>
          <a href='#about'>About</a>
          <a href='#artists'>Artists</a>
          <a href='#gallery'>Gallery</a>
          <button onClick={() => supabase.auth.signOut()}>Log out</button>
        </div>
      </nav>

      <header className='hero'>
        <p className='eyebrow'>31 Oct · Melville, 27 Boxes</p>
        <h1>
          The
          <br />
          Common
          <br />
          Ground
        </h1>
        <p className='hero-thanks'>Thank you for coming to the event</p>
        <a href='#gallery' className='hero-cta'>
          See gallery below ↓
        </a>
      </header>

      <section className='section about' id='about'>
        <div className='about-text'>
          <p className='eyebrow'>About</p>
          <h2>A shared space for creativity</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
        <div className='img-placeholder about-img'>Image</div>
      </section>

      <section className='section artists' id='artists'>
        <p className='eyebrow'>The line-up</p>
        <h2>Artists</h2>
        <div className='artist-grid'>
          {artists.map((artist) => (
            <article className='artist-card' key={artist.id}>
              {artist.src ? (
                <img src={artist.src} alt={artist.name} />
              ) : (
                <div className='img-placeholder artist-img'>Photo</div>
              )}
              <h3>{artist.name}</h3>
              <span className='artist-role'>{artist.role}</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className='section gallery' id='gallery'>
        <p className='eyebrow'>Memories</p>
        <h2>Gallery</h2>
        <div className='gallery-grid'>
          {photos.map((photo) => (
            <figure className={`gallery-item size-${photo.size}`} key={photo.id}>
              {photo.src ? (
                <img src={photo.src} alt={photo.name} loading='lazy' />
              ) : (
                <div className='img-placeholder gallery-img'>
                  {String(photo.id).padStart(2, '0')}
                </div>
              )}
              <button
                className='download-btn'
                aria-label={`Download ${photo.name}`}
                disabled={!photo.src}
                onClick={() => handleDownload(photo)}
              >
                ↓
              </button>
            </figure>
          ))}
        </div>
      </section>

      <footer className='footer'>
        <h3>The Common Ground</h3>
        <p>31 Oct · 13:00 – 19:00 · Melville, 27 Boxes</p>
        <p className='footer-small'>
          Sponsored by BOS Ice Tea · Bites by Sumthing Nice
        </p>
      </footer>
    </div>
  )
}

export default Gallery