import React, { useState, useEffect } from 'react';
import '../styles/Events.scss';
import gsap from 'gsap';

const Events = () => {

  const storedEvents = JSON.parse(localStorage.getItem('events')) || [];

  const [events, setEvents] = useState(storedEvents);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", category: "Religious", location: "", description: "" });
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    if (storedEvents.length === 0) {
      const defaultEvents = [
        { title: "Religious Gathering", date: "2025-03-25", category: "Religious", location: "St. Mary's Church", description: "A religious gathering for prayer and community." },
        { title: "Social Meet-Up", date: "2025-04-10", category: "Social", location: "Community Hall", description: "A casual meet-up for socializing and networking." },
        { title: "Charity Fundraiser", date: "2025-05-05", category: "Charity", location: "City Center", description: "A charity event to raise funds for local causes." },
        { title: "Yoga Retreat", date: "2025-06-15", category: "Religious", location: "Green Hills Resort", description: "A peaceful yoga retreat to relax and rejuvenate." },
        { title: "Tech Conference", date: "2025-07-20", category: "Social", location: "Convention Center", description: "A conference bringing together tech enthusiasts and professionals." }
      ];
      localStorage.setItem('events', JSON.stringify(defaultEvents));
      setEvents(defaultEvents);
    } else {
      setEvents(storedEvents);
    }

    gsap.from(".events header", {
      y: -100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
    });

    gsap.from(".events header img", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power2.out",
    });

    gsap.from(".events header nav a", {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
    });

    gsap.from(".events header button", {
      opacity: 0,
      y: 30,
      duration: 1,
      delay: 0.8,
      ease: "power2.out",
    });

    gsap.from("section h1", {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 1,
      ease: "power2.out",
    });

    gsap.from(".events article", {
      opacity: 0,
      y: 40,
      duration: 1,
      delay: 1.2,
      ease: "power2.out",
    });

    gsap.from(".events .events-list ", {
      opacity: 0,
      duration: 1.5,
      delay: 1.5,
      ease: "power2.out",
    });

  }, []);

  useEffect(() => {
    const eventList = document.querySelector('.events-list');
    
    gsap.set(eventList.children, { opacity: 0, scale: 0.9 });

    gsap.to(eventList.children, {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.1,
      duration: 1.5,
      ease: "power2.out",
    });

  }, [filter, events]);

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const addEvent = () => {
    const eventToAdd = {
      ...newEvent,
      location: newEvent.location || "Default Location",
      description: newEvent.description || "This is a short description.",
    };

    const updatedEvents = [...events, eventToAdd];
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));

    setNewEvent({ title: "", date: "", category: "Religious", location: "", description: "" });

    setIsModalOpen(false);
  };

  const filteredEvents = events.filter(event => filter === "All" || event.category === filter);

  const deleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getBackgroundImage = (category) => {
    switch (category) {
      case "Religious":
        return "url('https://res.cloudinary.com/dxqv8mbpg/image/upload/f_auto,q_auto/v1/event-images/event_1737999482266?_a=BAMCkGfi0')";
      case "Charity":
        return "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2hhcml0eXxlbnwwfHwwfHx8MA%3D%3D')";
      case "Social":
        return "url('https://res.cloudinary.com/dxqv8mbpg/image/upload/f_auto,q_auto/v1/event-images/event_1738152742578?_a=BAMCkGfi0";
      default:
        return "url('https://res.cloudinary.com/dxqv8mbpg/image/upload/f_auto,q_auto/v1/event-images/event_1742193402822?_a=BAMCkGfi0')";
    }
  };

  const shortDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className="events">
      <header>
        <img src="/MyLogo.png" alt="Logo" />
        <nav>
          <a href="/">Home</a>
          <a href="/events">Events</a>
          <a href="#">About</a>
        </nav>
        <button onClick={() => setIsModalOpen(true)}>Add Event</button>
      </header>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Event</h3>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              placeholder="Event Title"
            />
            <input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleInputChange}
            />
            <select
              name="category"
              value={newEvent.category}
              onChange={handleInputChange}
            >
              <option value="Religious">Religious</option>
              <option value="Social">Social</option>
              <option value="Charity">Charity</option>
            </select>
            <input
              type="text"
              name="location"
              value={newEvent.location}
              onChange={handleInputChange}
              placeholder="Event Location (Optional)"
            />
            <textarea
              name="description"
              value={newEvent.description}
              onChange={handleInputChange}
              placeholder="Event Description (Optional)"
            />
            <button onClick={addEvent}>Add Event</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}

      <section>
        <h1>We Helped Communities Connect & Flourish</h1>
        <article>
          <h2> ✦ Upcoming Events</h2>
          <div className="filter">
            <label>Filter by Category:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Religious">Religious</option>
              <option value="Social">Social</option>
              <option value="Charity">Charity</option>
            </select>
          </div>
        </article>
        <div className='events-list'>
          {filteredEvents.map((event, index) => (
              <div key={index} style={{ backgroundImage: getBackgroundImage(event.category), backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="lists">
                  <h3>{event.title}</h3>
                  <span className="date-text">{shortDate(event.date)}</span>
                </div>
                <div className='overlay'>
                  <h3>{event.title}</h3>
                  <p><span>Date : </span>{formatDate(event.date)}</p>
                  <p><span>Location : </span>{event.location}</p>
                  <p><span>Description : </span>{event.description}</p>
                  <article>
                    <button>Event Details</button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={() => deleteEvent(index)}>
                      <path d="M6 7V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M9 7h6M19 7v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7M10 11v6M14 11v6" />
                    </svg>
                  </article>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Events;
