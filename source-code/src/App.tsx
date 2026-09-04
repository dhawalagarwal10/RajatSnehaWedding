import { useEffect, useRef, useState } from "react";

const events = [
  {
    date: "20 NOV",
    time: "10:15 AM",
    name: "Carnival by the Pool",
    note: "A sunlit morning of games, laughter and colourful celebrations.",
  },
  {
    date: "20 NOV",
    time: "4:15 PM",
    name: "Sagai",
    note: "A beautiful promise, exchanged with the blessings of our families.",
  },
  {
    date: "20 NOV",
    time: "7:15 PM",
    name: "Sangeet",
    note: "An evening of music, dance and stories from the heart.",
  },
  {
    date: "21 NOV",
    time: "10:15 AM",
    name: "Mayra",
    note: "A morning wrapped in tradition, affection and family blessings.",
  },
  {
    date: "21 NOV",
    time: "5:15 PM",
    name: "Nikasi",
    note: "The groom sets forth, surrounded by music and joyous celebration.",
  },
  {
    date: "21 NOV",
    time: "7:15 PM",
    name: "Reception",
    note: "Dinner, celebration and an evening with our favourite people.",
  },
  {
    date: "21 NOV",
    time: "11:15 PM",
    name: "Pheras by the Pool",
    note: "Under the stars, we take seven vows and begin our forever.",
  },
];

const photos = [
  {
    src: "./photos/story-kiss.jpeg",
    alt: "Rajat kissing Sneha on the forehead",
    label: "A promise in every quiet moment",
  },
  {
    src: "./photos/rasha-2.jpeg",
    alt: "Rajat and Sneha together in bright pink festive outfits",
    label: "Always better together",
  },
  {
    src: "./photos/story-orange.jpeg",
    alt: "Rajat and Sneha laughing together",
    label: "Our favourite kind of laughter",
  },
  {
    src: "./photos/story-roka.jpeg",
    alt: "Rajat and Sneha smiling together",
    label: "From this day to always",
  },
  {
    src: "./photos/rasha-3.jpeg",
    alt: "Rajat and Sneha sharing a quiet moment in pink",
    label: "A little closer, every day",
  },
];

const celebrationDays = [
  { key: "20 NOV", date: "20" },
  { key: "21 NOV", date: "21" },
];

function Countdown() {
  const target = new Date("2026-11-21T23:15:00+05:30").getTime();
  const [left, setLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setLeft({
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor(diff / 3_600_000) % 24,
        minutes: Math.floor(diff / 60_000) % 60,
        seconds: Math.floor(diff / 1_000) % 60,
      });
    };

    tick();
    const id = window.setInterval(tick, 1_000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <div className="countdown" aria-label="Countdown to the wedding">
      {Object.entries(left).map(([label, value]) => (
        <div className="count" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [closing, setClosing] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rsvpResponse, setRsvpResponse] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const openInvite = () => {
    if (closing) return;
    setClosing(true);

    const audio = audioRef.current;
    if (audio) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }

    window.setTimeout(() => setOpened(true), 720);
  };

  return (
    <main>
      <audio
        ref={audioRef}
        src="./audio/din-shagna-da.mp3"
        loop
        preload="metadata"
      />

      {!opened && (
        <div
          className={`envelope invite-envelope ${closing ? "opening" : ""}`}
          onClick={openInvite}
          role="button"
          aria-label="Open Rajat and Sneha's wedding invitation"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              openInvite();
            }
          }}
        >
          <img
            className="envelope-art envelope-closed"
            src="./envelope-rs-closed.webp"
            alt="A blush wedding envelope sealed with Rajat and Sneha's R and S monogram"
            fetchPriority="high"
          />
          <span className="skip-intro" aria-hidden="true">
            Skip
          </span>
          <div className="open-hint">
            <span />
            <p>Tap anywhere to open</p>
            <span />
          </div>
        </div>
      )}

      {opened && (
        <div className="global-petals" aria-hidden="true">
          {Array.from({ length: 16 }, (_, index) => (
            <i key={index}>{index % 3 === 0 ? "✿" : "❀"}</i>
          ))}
        </div>
      )}

      <button
        className="music"
        onClick={toggleMusic}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? "♫" : "♪"}
        <span>{playing ? "Music on" : "Play music"}</span>
      </button>

      <section className="hero">
        <img
          src="./photos/wedding-watermark.jpg"
          alt="A romantic floral wedding mandap beside the pool"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">With the blessings of our families</p>
          <h1 className="hero-title">
            <span className="hero-name">Rajat</span>
            <i>&amp;</i>
            <span className="hero-name">Sneha</span>
          </h1>
          <div className="gold-rule">
            <span>✦</span>
          </div>
          <p className="marriage-line">Are getting married</p>
          <p className="hero-date">21 November 2026 · Bhilwara</p>
          <p className="hashtag">#Rasha</p>
        </div>
        <a className="scroll" href="#welcome">
          Scroll to celebrate <span>↓</span>
        </a>
      </section>

      <section id="welcome" className="welcome section-pad reveal">
        <p className="kicker">Two hearts, one beautiful journey</p>
        <h2>Our forever begins here</h2>
        <div className="flourish">✦ ❀ ✦</div>
        <p className="lead">
          With joyful hearts and the blessings of our families, we invite you to
          celebrate the beginning of our forever. Two hearts, one beautiful
          journey, and memories waiting to bloom.
        </p>
        <p className="count-label">The celebration begins in</p>
        <Countdown />
      </section>

      <section className="schedule itinerary-section section-pad">
        <div className="reveal">
          <h2>Schedule of Events</h2>
          <div className="ornament">❦</div>
        </div>
        <div className="itinerary">
          {celebrationDays.map((day, dayIndex) => (
            <section
              className="itinerary-day reveal"
              key={day.key}
              aria-labelledby={`date-${day.date}`}
            >
              <header className="itinerary-date">
                <strong id={`date-${day.date}`}>{day.date}</strong>
                <em>November 2026</em>
              </header>
              <div className="timeline">
                {events
                  .filter((event) => event.date === day.key)
                  .map((event, eventIndex) => (
                    <article
                      className={`timeline-event ${
                        eventIndex % 2 ? "copy-left" : "copy-right"
                      } reveal`}
                      key={event.name}
                    >
                      <time className="timeline-time">{event.time}</time>
                      <div className="timeline-marker">
                        <span>✦</span>
                      </div>
                      <div className="timeline-copy">
                        <h3>{event.name}</h3>
                        <p>{event.note}</p>
                      </div>
                    </article>
                  ))}
              </div>
              {dayIndex === 0 && (
                <div className="day-divider" aria-hidden="true">
                  <span>❀</span>
                </div>
              )}
            </section>
          ))}
        </div>
      </section>

      <section className="gallery section-pad">
        <div className="reveal">
          <p className="kicker">A few moments from our story</p>
          <h2>Us, in every season</h2>
        </div>
        <div className="photo-grid">
          {photos.map((photo, index) => (
            <figure
              className={`photo photo-${index + 1} reveal`}
              key={photo.src}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading={index > 1 ? "lazy" : "eager"}
              />
              <figcaption>{photo.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="venue section-pad">
        <div className="venue-art reveal">
          <img
            src="./photos/shouryagarh-palace.jpeg"
            alt="Shouryagarh Palace wedding lawn at sunset"
            loading="lazy"
          />
        </div>
        <div className="venue-copy reveal">
          <p className="kicker">Where we’ll celebrate</p>
          <h2>Shouryagarh Palace</h2>
          <p>
            Near Harni Mahadev, opposite Vridha Aashram,
            <br />
            Mangrop Road, Bhilwara, Rajasthan 311001
          </p>
          <a
            href="https://maps.app.goo.gl/jY78NVCC3oMsJG6YA?g_st=aw"
            target="_blank"
            rel="noreferrer"
          >
            Get directions <span>↗</span>
          </a>
        </div>
      </section>

      <section className="rsvp section-pad">
        <div className="reveal">
          <p className="kicker">Join the celebration</p>
          <h2>Will you be there?</h2>
          <p className="rsvp-intro">
            Fill in your details below. Your response will be recorded
            automatically.
          </p>
        </div>
        <div className="rsvp-card reveal">
          {!submitted ? (
            <form
              action="https://docs.google.com/forms/d/e/1FAIpQLSedoxH7ZawsI5Un9FN3ADKjmxkGNsrYsIaI7AnayLMLktqEzw/formResponse"
              method="POST"
              target="rsvp-response"
              onSubmit={() => setSubmitting(true)}
            >
              <label>
                Full name
                <input
                  name="entry.625798046"
                  required
                  placeholder="Your full name"
                />
              </label>
              <div className="form-row">
                <label>
                  Response
                  <select
                    name="entry.1102999879"
                    required
                    value={rsvpResponse}
                    onChange={e => setRsvpResponse(e.target.value)}
                  >
                    <option value="" disabled>
                      Choose your response
                    </option>
                    <option value="Joyfully accepts">Joyfully accepts</option>
                    <option value="Regretfully declines">
                      Regretfully declines
                    </option>
                  </select>
                </label>
                <label>
                  Number of guests
                  <input
                    name="entry.204303231"
                    type="number"
                    min="1"
                    max="20"
                    required={rsvpResponse !== "Regretfully declines"}
                    placeholder="1"
                  />
                </label>
              </div>
              <label>
                A note for us <span>Optional</span>
                <textarea
                  name="entry.232633608"
                  placeholder="Write a little something…"
                />
              </label>
              <input type="hidden" name="fvv" defaultValue="1" />
              <input type="hidden" name="pageHistory" defaultValue="0" />
              <button type="submit" disabled={submitting}>
                {submitting ? (
                  "Recording RSVP…"
                ) : (
                  <>
                    Send RSVP <span>♥</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="thanks">
              <div>♥</div>
              <h3>Thank you!</h3>
              <p>
                Your RSVP has been recorded. We cannot wait to celebrate with
                you.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setSubmitting(false);
                }}
              >
                Send another response
              </button>
            </div>
          )}
          <iframe
            name="rsvp-response"
            title="RSVP submission response"
            className="response-frame"
            onLoad={() => {
              if (submitting) setSubmitted(true);
            }}
          />
        </div>
      </section>

      <footer>
        <img
          className="brand-logo footer-logo"
          src="./rs-logo.png"
          alt="Rajat and Sneha wedding monogram"
        />
        <h2>Rajat &amp; Sneha</h2>
        <p>20–21 November 2026 · Bhilwara, Rajasthan</p>
        <p className="hashtag">#Rasha</p>
      </footer>
    </main>
  );
}
