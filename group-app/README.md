# Hack4Impact-UMD Minority Student Day Workshop

This repository contains a simple web application designed for the Black at Microsoft Minority Student Day (BMSD) workshop. This workshop was created to teach students the role of AI in modern software development. This web application is meant to run on a Windows 11 machine.

## Follow Along With The Slides — "Software Development in the Age of AI"

This workshop was administered using [this slide deck](https://docs.google.com/presentation/d/1i411kl-3xVSfNLtZqIhWnhERsHeoETHpdGRYhkIJfgc/edit?usp=sharing). Make sure to follow along with it starting at slide 10 — "Hands-on Development"!

## About BMSD

**BMSD (Black at Microsoft Minority Student Day)** is an all-day event that brings over 100 high school students from local schools to Microsoft's Arlington, Virginia office. Some goals of the event include:
- Introducing high school students to STEAM careers
- Empowering them through Microsoft technologies
- Enhancing their career readiness in collaboration with Microsoft employees

The event specifically connects with underrepresented groups in STEAM, including Black, Hispanic/Latinx, and female students. Beyond building technical skills, BMSD emphasizes teamwork and professional soft skills through:
- Engaging workshops
- Networking opportunities
- Hands-on activities
- Informative topic-based learning sessions
- Keynote speakers, and more!

## Workshop Overview

Our nonprofit organization, Hack4Impact-UMD, was asked to administer a Workshop at BMSD. As the Executive Director of Hack4Impact-UMD, I created this workshop to provide a full-stack development experience that is both informative and engaging. Students work in groups using Microsoft laptops that connect to pre-configured Windows 11 Azure VMs. Each VM runs an instance of our web application, built with Next.js, React, Next.JS API Middleware, and Azure Cosmosc NoSQL DB for the backend.

### Purpose

- **Full-Stack Experience:** Demonstrate real-world web development by having students interact with both the frontend (React/Next.js) and the backend (API routes interacting with Azure Cosmos DB).
- **Standardization:** Each student group gets a consistent environment with the correct installed packages.
- **Collaboration:** Enable teamwork as students build, test, and deploy web applications using modern Microsoft technologies.

## Infrastructure

- **Frontend:** A simple React web application created with Next.js, utilizing Next.js API middleware for backend interaction.
- **Backend:** Azure Cosmos NoSQL DB that hosts a shared database. Each group works with a unique partition based on their ipAddress, using partition key "/ipAddress".

## Functionality

- **Team Registration:** Students can enter team member names and ages via a simple web form.
- **Data Handling:** The application supports basic operations:
  - **View:** List current team members
  - **Add:** Insert a new team member into the database
  - **Delete:** Remove a team member from the database
- **Extensibility:** The design is modular, making it easy to add new fields or functionality as the workshop progresses.
- **Progression:** The students practice building multiple features into their tool as well as troubleshoot errors, all with the help of AI.

## How to Run Locally

**Technical Requirements:**
- Node.js v22.14.0 (LTS)
- Git (make sure to check yes when prompted to "install special C/C++ packages to help with Python development")

``Note: If you are using something other than Windows 11, the text in the form fields may gray/harder to read``

1. **Setup Azure Infrastructure**
  - Setup Azure CosmosDB, partitioned by /ipAddress
  - Create database (DB_NAM) and container (COLLECTION_NAME)
   
2. **Clone the Repository:**
   ```bash
   git clone https://github.com/DevShel/microsoft-workshop.git
   cd microsoft-workshop/group-app
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Configure Environment Variables:**

   Create a `.env` file in the group-app directory with the following keys:
   ```env
      COSMOS_ENDPOINT=INSERT
      COSMOS_KEY=INSERT
      DB_NAME=INSERT
      COLLECTION_NAME=INSERT
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```

   The application will run on `http://localhost:3000`.


# Final Thoughts

Building this project was very rewarding and I am happy with how it all turned out. I hope this helps inspire the next generation of STEAM students!