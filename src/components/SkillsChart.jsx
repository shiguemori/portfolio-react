import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const SkillsChart = ({ language }) => {
  const skillsData = [
    { skill: 'Golang', level: 95, category: 'Backend' },
    { skill: 'Python', level: 90, category: 'Backend' },
    { skill: 'JavaScript', level: 88, category: 'Frontend' },
    { skill: 'React', level: 90, category: 'Frontend' },
    { skill: 'AWS', level: 90, category: 'Cloud' },
    { skill: 'Docker', level: 88, category: 'DevOps' },
    { skill: 'MySQL', level: 90, category: 'Database' },
    { skill: 'Kubernetes', level: 85, category: 'DevOps' }
  ];

  const radarData = skillsData.map(skill => ({
    skill: skill.skill,
    level: skill.level
  }));

  const categoryData = [
    { category: 'Backend', average: 92.5 },
    { category: 'Frontend', average: 89 },
    { category: 'Cloud', average: 90 },
    { category: 'DevOps', average: 86.5 },
    { category: 'Database', average: 90 }
  ];

  const experienceData = [
    { year: '2012', projects: 1 },
    { year: '2013', projects: 2 },
    { year: '2014', projects: 3 },
    { year: '2015', projects: 4 },
    { year: '2016', projects: 5 },
    { year: '2017', projects: 7 },
    { year: '2018', projects: 12 },
    { year: '2019', projects: 15 },
    { year: '2020', projects: 18 },
    { year: '2021', projects: 22 },
    { year: '2022', projects: 25 },
    { year: '2023', projects: 28 },
    { year: '2024', projects: 32 },
    { year: '2025', projects: 35 }
  ];

  const titles = {
    pt: {
      radar: 'Radar de Habilidades Técnicas',
      categories: 'Proficiência por Categoria',
      experience: 'Evolução de Projetos ao Longo dos Anos',
      projects: 'Projetos'
    },
    en: {
      radar: 'Technical Skills Radar',
      categories: 'Proficiency by Category',
      experience: 'Project Evolution Over the Years',
      projects: 'Projects'
    }
  };

  const t = titles[language];

  return (
    <div className="grid lg:grid-cols-2 gap-8 mb-12">
      {/* Radar Chart */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-center">{t.radar}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#ffffff20" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: '#ffffff', fontSize: 12 }} />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fill: '#ffffff80', fontSize: 10 }}
                tickCount={6}
              />
              <Radar
                name="Level"
                dataKey="level"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Bar Chart */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white text-center">{t.categories}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis 
                dataKey="category" 
                tick={{ fill: '#ffffff', fontSize: 12 }}
                axisLine={{ stroke: '#ffffff40' }}
              />
              <YAxis 
                domain={[0, 100]}
                tick={{ fill: '#ffffff80', fontSize: 10 }}
                axisLine={{ stroke: '#ffffff40' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e1b4b', 
                  border: '1px solid #8b5cf6',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
              />
              <Bar 
                dataKey="average" 
                fill="url(#colorGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Experience Timeline Chart */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-white text-center">{t.experience}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={experienceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis 
                dataKey="year" 
                tick={{ fill: '#ffffff', fontSize: 12 }}
                axisLine={{ stroke: '#ffffff40' }}
              />
              <YAxis 
                tick={{ fill: '#ffffff80', fontSize: 10 }}
                axisLine={{ stroke: '#ffffff40' }}
                label={{ value: t.projects, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#ffffff80' } }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e1b4b', 
                  border: '1px solid #8b5cf6',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
                labelStyle={{ color: '#8b5cf6' }}
              />
              <Bar 
                dataKey="projects" 
                fill="url(#experienceGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="experienceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsChart;

