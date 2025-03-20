# Hack4Impact-UMD Minority Student Day Workshop

This repository contains a simple web application designed for the Blacks at Microsoft Minority Student Day (BMSD) workshop. This workshop was created to bridge the digital divide and empower underrepresented students in STEAM fields. The application is meant to run on a Windows 11 machine and was deployed across ~40 Azure VM containers to provide a standardized development environment for each group.

## About BMSD

**BMSD (Blacks at Microsoft Minority Student Day)** is a STEAM (Science, Technology, Engineering, Arts, Mathematics) event aimed at:
- Introducing high school students to STEAM careers
- Empowering them through Microsoft technologies
- Enhancing their career readiness in collaboration with Microsoft employees

The event specifically connects with underrepresented groups in STEAM, including Black, Hispanic/Latinx, and female students. Beyond building technical skills, BMSD emphasizes teamwork, mental well-being, and professional soft skills through:
- Engaging workshops
- Networking opportunities
- Hands-on activities
- Informative topic-based learning sessions
- Keynote speakers, and more!

## Workshop Overview

Our nonprofit organization, Hack4Impact-UMD, was asked to administer a Workshop at BMSD. As the Executive Director of Hack4Impact-UMD, I created this workshop to provide a full-stack development experience that is both accessible and engaging. Students work in groups using Microsoft laptops that connect to pre-configured Windows 11 Azure VMs. Each VM runs an instance of our web application, built with Next.js, React, and integrated with a shared Azure Cosmos DB instance (using the MongoDB API) for the backend.

### Purpose

- **Full-Stack Experience:** Demonstrate real-world web development by having students interact with both the frontend (React/Next.js) and the backend (API routes interacting with Azure Cosmos DB).
- **Standardization:** Each student group gets a consistent environment, thanks to containerized Windows 11 VMs.
- **Collaboration:** Enable teamwork as students build, test, and deploy web applications using modern Microsoft technologies.

## Infrastructure

- **Azure VMs:** 40 Windows 11 containers, each pre-configured with the necessary tools (VSCode, NPM, etc.) and a standardized Next.js setup.
- **Frontend:** A simple React web application created with Next.js, utilizing API routes for backend interaction.
- **Backend:** Azure Cosmos DB (using the MongoDB API) that hosts a shared database. Each group works with a unique table/collection, defined via an environment variable.
- **Deployment:** The infrastructure allows for quick duplication of environments, ensuring all student groups have access to the same full-stack development setup.

## Functionality

- **Team Registration:** Students can enter team member names and ages via a simple web form.
- **Data Handling:** The application supports basic CRUD operations:
  - **View:** List current team members
  - **Add:** Insert a new team member into the database
  - **Delete:** Remove a team member from the database
- **Extensibility:** The design is modular, making it easy to add new fields or functionality as the workshop progresses.

## How to Run Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory with the following keys:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   DB_NAME=yourDatabaseName
   COLLECTION_NAME=uniqueCollectionNameForThisInstance
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

   The application will run on `http://localhost:3000`.

## Final Notes

This project is specifically tailored for our BMSD workshop. It provides a hands-on opportunity for students to experience full-stack development with modern technologies in a controlled, standardized environment. We hope this workshop inspires and empowers the next generation of STEAM leaders.
