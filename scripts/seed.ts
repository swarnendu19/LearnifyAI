import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create a sample user
    const user = await prisma.user.upsert({
        where: { email: 'demo@example.com' },
        update: {},
        create: {
            id: 'demo-user-id',
            name: 'Demo User',
            email: 'demo@example.com',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            credits: 10,
        },
    });

    console.log('✅ Created demo user:', user.email);

    // Create a sample course
    const course = await prisma.course.create({
        data: {
            name: 'Introduction to Machine Learning',
            image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
        },
    });

    console.log('✅ Created sample course:', course.name);

    // Create sample units
    const unit1 = await prisma.unit.create({
        data: {
            name: 'Machine Learning Basics',
            courseId: course.id,
        },
    });

    const unit2 = await prisma.unit.create({
        data: {
            name: 'Supervised Learning',
            courseId: course.id,
        },
    });

    const unit3 = await prisma.unit.create({
        data: {
            name: 'Unsupervised Learning',
            courseId: course.id,
        },
    });

    console.log('✅ Created sample units');

    // Create sample chapters for unit 1
    await prisma.chapter.createMany({
        data: [
            {
                name: 'What is Machine Learning?',
                youtubeSearchQuery: 'machine learning introduction basics explained',
                unitId: unit1.id,
                videoId: 'aircAruvnKk',
                summary: 'An introduction to machine learning concepts and applications.',
            },
            {
                name: 'Types of Machine Learning',
                youtubeSearchQuery: 'supervised unsupervised reinforcement learning types',
                unitId: unit1.id,
                videoId: 'f_uwKZIAeM0',
                summary: 'Overview of different types of machine learning approaches.',
            },
        ],
    });

    // Create sample chapters for unit 2
    await prisma.chapter.createMany({
        data: [
            {
                name: 'Linear Regression',
                youtubeSearchQuery: 'linear regression machine learning tutorial',
                unitId: unit2.id,
                videoId: 'nk2CQITm_eo',
                summary: 'Understanding linear regression for predictive modeling.',
            },
            {
                name: 'Classification Algorithms',
                youtubeSearchQuery: 'classification algorithms machine learning explained',
                unitId: unit2.id,
                videoId: 'yX8Q2fsP2gU',
                summary: 'Introduction to classification techniques in machine learning.',
            },
        ],
    });

    // Create sample chapters for unit 3
    await prisma.chapter.createMany({
        data: [
            {
                name: 'Clustering',
                youtubeSearchQuery: 'clustering algorithms k-means machine learning',
                unitId: unit3.id,
                videoId: '_aWzGGNrcic',
                summary: 'Understanding clustering techniques for data analysis.',
            },
            {
                name: 'Dimensionality Reduction',
                youtubeSearchQuery: 'PCA dimensionality reduction machine learning',
                unitId: unit3.id,
                videoId: 'FgakZw6K1QQ',
                summary: 'Techniques for reducing data complexity while preserving information.',
            },
        ],
    });

    console.log('✅ Created sample chapters');

    // Create another sample course
    const course2 = await prisma.course.create({
        data: {
            name: 'Web Development Fundamentals',
            image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
        },
    });

    const webUnit = await prisma.unit.create({
        data: {
            name: 'HTML & CSS Basics',
            courseId: course2.id,
        },
    });

    await prisma.chapter.createMany({
        data: [
            {
                name: 'HTML Structure',
                youtubeSearchQuery: 'HTML basics tutorial structure elements',
                unitId: webUnit.id,
                videoId: 'UB1O30fR-EE',
                summary: 'Learn the fundamental structure of HTML documents.',
            },
            {
                name: 'CSS Styling',
                youtubeSearchQuery: 'CSS basics tutorial styling properties',
                unitId: webUnit.id,
                videoId: 'yfoY53QXEnI',
                summary: 'Introduction to CSS for styling web pages.',
            },
        ],
    });

    console.log('✅ Created second sample course');

    console.log('🎉 Database seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });