// src/app/home/page.tsx
'use client';

import {
    PlayArrow,
    Visibility,
    FavoriteBorder,
    Logout,
    CloudUpload,
    Person,
    Notifications,
    Search,
} from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Grid,
    IconButton,
    InputBase,
    Paper,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

interface Video {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    duration: string;
    views: string;
    category: string;
}

export default function HomePage() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    const categories = ['Todos', 'Programación', 'Diseño', 'Marketing', 'Fotografía', 'Productividad'];

    const videos: Video[] = [
        {
            id: 1,
            title: 'Introducción a React',
            description: 'Aprende los fundamentos de React desde cero',
            thumbnail: 'https://picsum.photos/seed/react/400/225',
            duration: '15:30',
            views: '12.5k',
            category: 'Programación'
        },
        {
            id: 2,
            title: 'Diseño UI/UX Moderno',
            description: 'Técnicas avanzadas de diseño de interfaces',
            thumbnail: 'https://picsum.photos/seed/design/400/225',
            duration: '22:45',
            views: '8.3k',
            category: 'Diseño'
        },
        {
            id: 3,
            title: 'Marketing Digital',
            description: 'Estrategias efectivas para redes sociales',
            thumbnail: 'https://picsum.photos/seed/marketing/400/225',
            duration: '18:20',
            views: '15.7k',
            category: 'Marketing'
        },
        {
            id: 4,
            title: 'Fotografía Profesional',
            description: 'Domina tu cámara y crea imágenes increíbles',
            thumbnail: 'https://picsum.photos/seed/photo/400/225',
            duration: '25:10',
            views: '10.2k',
            category: 'Fotografía'
        },
    ];

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const email = localStorage.getItem('userEmail');
        
        if (!isLoggedIn) {
            router.push('/login');
        } else if (email) {
            setUserEmail(email);
        }
    }, [router]);

    const handleLogout = () => {
        Swal.fire({
            title: '¿Cerrar sesión?',
            text: '¿Estás seguro de que quieres salir?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#764ba2',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');
                router.push('/login');
            }
        });
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const filteredVideos = selectedCategory === 'Todos' 
        ? videos 
        : videos.filter(video => video.category === selectedCategory);

    return (
        <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            {/* App Bar */}
            <AppBar 
                position="fixed" 
                elevation={1}
                sx={{ 
                    backgroundColor: 'white',
                    color: 'text.primary'
                }}
            >
                <Toolbar>
                    {/* Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 0 }}>
                        <Box
                            sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 1,
                            }}
                        >
                            <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
                                MA
                            </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            MyApp
                        </Typography>
                    </Box>

                    {/* Navigation */}
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 4 }}>
                        <Button sx={{ textTransform: 'none', color: 'text.primary' }}>
                            Home
                        </Button>
                        <Button sx={{ textTransform: 'none', color: 'text.secondary' }}>
                            Explore
                        </Button>
                        <Button sx={{ textTransform: 'none', color: 'text.secondary' }}>
                            About
                        </Button>
                    </Box>

                    {/* Right side */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton>
                            <Notifications />
                        </IconButton>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar 
                                onClick={handleMenuOpen}
                                sx={{ 
                                    width: 35, 
                                    height: 35, 
                                    cursor: 'pointer',
                                    backgroundColor: '#764ba2' 
                                }}
                            >
                                {userEmail?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
                                {userEmail?.split('@')[0]}
                            </Typography>
                        </Box>

                        <Button
                            variant="outlined"
                            startIcon={<Logout />}
                            onClick={handleLogout}
                            sx={{
                                ml: 2,
                                textTransform: 'none',
                                borderColor: '#764ba2',
                                color: '#764ba2',
                                '&:hover': {
                                    borderColor: '#5a3a8a',
                                    backgroundColor: 'rgba(118, 75, 162, 0.04)'
                                }
                            }}
                        >
                            Cerrar sesión
                        </Button>
                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>
                            <Person sx={{ mr: 1 }} /> Perfil
                        </MenuItem>
                        
                        <MenuItem onClick={handleLogout}>
                            <Logout sx={{ mr: 1 }} /> Cerrar sesión
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container maxWidth="xl" sx={{ pt: 12, pb: 4 }}>
                {/* Header Section */}
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                Bienvenido a tu Dashboard
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Explora nuestro contenido multimedia y comienza a aprender hoy mismo
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            startIcon={<CloudUpload />}
                            sx={{
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                textTransform: 'none',
                                px: 3,
                                py: 1.5,
                                fontWeight: 600,
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                                }
                            }}
                        >
                            Subir Video
                        </Button>
                    </Box>

                    {/* Category Chips */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {categories.map((category) => (
                            <Chip
                                key={category}
                                label={category}
                                onClick={() => setSelectedCategory(category)}
                                sx={{
                                    backgroundColor: selectedCategory === category 
                                        ? '#764ba2' 
                                        : 'white',
                                    color: selectedCategory === category 
                                        ? 'white' 
                                        : 'text.primary',
                                    border: '1px solid',
                                    borderColor: selectedCategory === category 
                                        ? '#764ba2' 
                                        : '#e0e0e0',
                                    '&:hover': {
                                        backgroundColor: selectedCategory === category 
                                            ? '#5a3a8a' 
                                            : '#f5f5f5',
                                    },
                                    fontWeight: selectedCategory === category ? 600 : 400,
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                {/* Video Grid */}
                <Grid container spacing={3}>
                    {filteredVideos.map((video) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: 4,
                                    },
                                }}
                            >
                                {/* Video Thumbnail */}
                                <Box sx={{ position: 'relative' }}>
                                    <CardMedia
                                        component="img"
                                        height="180"
                                        image={video.thumbnail}
                                        alt={video.title}
                                    />
                                    {/* Duration Badge */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 8,
                                            right: 8,
                                            backgroundColor: 'rgba(0,0,0,0.8)',
                                            color: 'white',
                                            px: 1,
                                            py: 0.5,
                                            borderRadius: 1,
                                            fontSize: '0.75rem',
                                        }}
                                    >
                                        {video.duration}
                                    </Box>
                                    {/* Play Overlay */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'rgba(0,0,0,0.3)',
                                            opacity: 0,
                                            transition: 'opacity 0.3s',
                                            '&:hover': {
                                                opacity: 1,
                                            },
                                        }}
                                    >
                                        <PlayArrow sx={{ fontSize: 50, color: 'white' }} />
                                    </Box>
                                </Box>

                                {/* Video Info */}
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Chip 
                                        label={video.category} 
                                        size="small" 
                                        sx={{ 
                                            mb: 1,
                                            backgroundColor: '#f3f4f6',
                                            color: '#764ba2',
                                            fontSize: '0.75rem'
                                        }} 
                                    />
                                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: '1rem' }}>
                                        {video.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {video.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <Visibility sx={{ fontSize: 18, color: 'text.secondary' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {video.views}
                                            </Typography>
                                            <Typography>    </Typography>
                                        </Box>
                                        <IconButton size="small" sx={{ ml: 'auto' }}>
                                            <FavoriteBorder sx={{ fontSize: 20 }} />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}