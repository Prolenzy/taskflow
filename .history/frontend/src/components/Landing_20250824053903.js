import React from 'react';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      {/* Header */}
      <header>
        <div className="container">
          <div className="header-content">
            <a href="/" className="logo">
              <div className="logo-icon">
                <i className="fas fa-tasks"></i>
              </div>
              <div className="logo-text">TaskFlow</div>
            </a>
            <nav>
              <a href="#features" className="nav-link">Features</a>
              <a href="#testimonials" className="nav-link">Testimonials</a>
              <a href="/login" className="nav-link">Login</a>
              <a href="/register" className="nav-link cta">Register</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Streamline Your Productivity</h1>
            <p>TaskFlow is the intelligent task management platform that helps teams and individuals organize, prioritize, and get work done more efficiently.</p>
            <div className="hero-buttons">
              <a href="/register" className="btn btn-primary">Get Started Free</a>
              <a href="#features" className="btn btn-outline">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <div className="section-title">
            <h2>Powerful Features</h2>
            <p>Everything you need to manage tasks efficiently and boost productivity</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-layer-group"></i>
              </div>
              <h3>Organize with Boards</h3>
              <p>Visualize your workflow with customizable kanban boards for any project or team.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>Time Tracking</h3>
              <p>Track time spent on tasks and generate detailed reports for better productivity insights.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Team Collaboration</h3>
              <p>Assign tasks, leave comments, and collaborate in real-time with your team members.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-bell"></i>
              </div>
              <h3>Smart Notifications</h3>
              <p>Get notified about important updates and deadlines without feeling overwhelmed.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-chart-pie"></i>
              </div>
              <h3>Advanced Analytics</h3>
              <p>Gain insights into your productivity patterns with detailed charts and reports.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3>Mobile Access</h3>
              <p>Manage your tasks on the go with our iOS and Android mobile applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-title">
            <h2>Trusted by Thousands</h2>
            <p>See what our users are saying about TaskFlow</p>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                "TaskFlow has completely transformed how our team manages projects. We've seen a 34% increase in productivity since we started using it."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">SJ</div>
                <div className="author-details">
                  <h4>Sarah Johnson</h4>
                  <p>Project Manager, TechCorp</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                "I've tried dozens of task management apps, but TaskFlow strikes the perfect balance between power and simplicity. It just works!"
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">MR</div>
                <div className="author-details">
                  <h4>Michael Rodriguez</h4>
                  <p>Freelance Developer</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-content">
                "The analytics features have given us incredible insights into our team's workflow. We've identified bottlenecks we didn't even know existed."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">AK</div>
                <div className="author-details">
                  <h4>Amanda Kim</h4>
                  <p>CTO, StartupHub</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-column">
              <h3>TaskFlow</h3>
              <p>The intelligent task management platform for teams and individuals.</p>
            </div>
            <div className="footer-column">
              <h3>Product</h3>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="/register">Sign Up</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Resources</h3>
              <ul className="footer-links">
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="#/">Support</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Company</h3>
              <ul className="footer-links">
                <li><a href="#/">About Us</a></li>
                <li><a href="#/">Contact</a></li>
                <li><a href="#/">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;