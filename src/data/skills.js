import {
  SiReact, SiNextdotjs, SiVuedotjs, SiTypescript, SiJavascript,
  SiTailwindcss, SiNodedotjs, SiLaravel, SiPython, SiDjango,
  SiExpress, SiGraphql, SiPostgresql, SiMongodb, SiMysql,
  SiRedis, SiFirebase, SiAmazons3,
  SiDocker, SiKubernetes, SiGithubactions, SiTerraform,
  SiTensorflow, SiPytorch, SiScikitlearn, SiOpenai,
  SiAmazonwebservices, SiGooglecloud, SiFigma, SiGit
} from "react-icons/si";

export const skillCategories = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: [
      { name: "React", level: 95, icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", level: 92, icon: SiNextdotjs, color: "#ffffff" },
      { name: "Vue.js", level: 85, icon: SiVuedotjs, color: "#4FC08D" },
      { name: "TypeScript", level: 93, icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", level: 97, icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind CSS", level: 90, icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: [
      { name: "Node.js", level: 94, icon: SiNodedotjs, color: "#339933" },
      { name: "Laravel", level: 90, icon: SiLaravel, color: "#FF2D20" },
      { name: "Python", level: 93, icon: SiPython, color: "#3776AB" },
      { name: "Django", level: 82, icon: SiDjango, color: "#092E20" },
      { name: "Express.js", level: 91, icon: SiExpress, color: "#ffffff" },
      { name: "GraphQL", level: 85, icon: SiGraphql, color: "#E10098" },
    ],
  },
  {
    title: "Database",
    icon: "🗄️",
    skills: [
      { name: "PostgreSQL", level: 92, icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", level: 88, icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", level: 90, icon: SiMysql, color: "#4479A1" },
      { name: "Redis", level: 85, icon: SiRedis, color: "#DC382D" },
      { name: "Firebase", level: 83, icon: SiFirebase, color: "#FFCA28" },
      { name: "Amazon S3", level: 80, icon: SiAmazons3, color: "#569A31" },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "☁️",
    skills: [
      { name: "AWS", level: 88, icon: SiAmazonwebservices, color: "#FF9900" },
      { name: "Google Cloud", level: 85, icon: SiGooglecloud, color: "#4285F4" },
      { name: "Docker", level: 90, icon: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", level: 82, icon: SiKubernetes, color: "#326CE5" },
      { name: "CI/CD", level: 88, icon: SiGithubactions, color: "#2088FF" },
      { name: "Terraform", level: 78, icon: SiTerraform, color: "#7B42BC" },
    ],
  },
  {
    title: "Machine Learning",
    icon: "🤖",
    skills: [
      { name: "TensorFlow", level: 87, icon: SiTensorflow, color: "#FF6F00" },
      { name: "PyTorch", level: 83, icon: SiPytorch, color: "#EE4C2C" },
      { name: "Scikit-learn", level: 90, icon: SiScikitlearn, color: "#F7931E" },
      { name: "OpenAI API", level: 88, icon: SiOpenai, color: "#ffffff" },
      { name: "Figma", level: 80, icon: SiFigma, color: "#F24E1E" },
      { name: "Git", level: 95, icon: SiGit, color: "#F05032" },
    ],
  },
];
