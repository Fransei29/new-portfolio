import ProjectCard from '../../components/ProjectCard';

const projects = [
  {
    title: 'Greengrocery El Gringo',
    description: 'An E-Commerce platform for fresh produce and groceries.',
    link2: 'https://github.com/Fransei29/Verdufront.git',
    previewImage: '/img/verdu.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/Verdufront.git',
      'cd Verdufront',
      'npm install',
      'npm run start'
    ]
  },
  {
    title: 'Vestiré',
    description: 'A fashion E-Commerce website offering a wide range of clothing and accessories.',
    link2: 'https://github.com/Fransei29/vestire_front.git',
    previewImage: '/img/vestire2.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/vestire_front.git',
      'cd vestire_front',
      'npm install',
      'npm run start'
    ]
  },
  {
    title: "My Firt Portfolio",
    description: 'A simple and elegant portfolio website built using HTML and CSS, showcasing my initial projects and skills.',
    link2: 'https://github.com/Fransei29/Portfolio.git',
    previewImage: '/img/port.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/Portfolio.git',
      'cd Portfolio',
      'go live'
    ]
  },
  {
    title: 'Flipper',
    description: 'A Twitter clone with functionalities like tweeting, following, and real-time updates.',
    link2: 'https://github.com/Fransei29/clonetwitter.git',
    previewImage: '/img/flipper.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/clonetwitter.git',
      'cd clonetwitter',
      'npm install',
      'npm run start'
    ]
  },
  {
    title: 'Holistic Wellness Portal',
    description: 'A website dedicated to alternative therapies and holistic wellness services.',
    link2: 'https://github.com/Fransei29/AmnerisWeb.git',
    link3: 'https://amneris-web.vercel.app/',
    previewImage: '/img/holis.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/AmnerisWeb.git',
      'cd AmnerisWeb',
      'npm install',
      'npm run start'
    ]
  },
  {
    title: 'Trip Planner',
    description: 'An app designed to help users plan their trips with ease, offering various travel-related services.',
    link2: 'https://github.com/Fransei29/tripplanner.git',
    link3: 'https://tripplanner-beryl.vercel.app/',
    previewImage: '/img/trip.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/tripplanner.git',
      'cd tripplanner',
      'npm install',
      'npm run start'
    ]
  },
  {
    title: "Post's place",
    description: 'A website dedicated to creating, viewing, and managing posts, with support for various content types.',
    link2: 'https://github.com/Fransei29/graphql_front.git',
    previewImage: '/img/gra.png',
    logs: [
      'git init',
      'git clone https://github.com/Fransei29/graphql_front.git',
      'cd graphql_front',
      'npm install',
      'npm run start'
    ]
  },
  
];


export default function Projects() {
  return (
    <div className='titlepro'>
      <h1 className="page-title">Projects</h1>
    <div className='projects1'>
      {projects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
    </div>
  );
}
