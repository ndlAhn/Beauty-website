import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import './profileView.css'
import React from "react";
import { Avatar, Typography, Box, IconButton, Button } from "@mui/material";

function ProfileView() {
    return(
        <div>
            <Header />
            <div>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mt="50px"
                    minHeight="100vh"
                    bgcolor="#fff"
                >
                    <Box position="relative">
                        <Avatar
                            sx={{ width: 120, height: 120, bgcolor: "#dfb5b5" }}
                        />
                        <IconButton
                            sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                bgcolor: "#fff",
                                borderRadius: "50%",
                                p: 0.5
                            }}
                        >
                        </IconButton>
                    </Box>

                    <Typography
                        variant="h5"
                        sx={{ mt: 2, color: "#3c4b57", fontWeight: 500 }}
                    >
                        User's name
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#3c4b57", mt: 1 }}>
                        Share story or quote...
                    </Typography>

                    <Box display="flex" justifyContent="center" mt={3}>
                        {[
                            { label: "Posts", value: 0 },
                            { label: "Followers", value: 0 },
                            { label: "Following", value: 0 },
                        ].map((item, index) => (
                            <Box key={index} mx={3} textAlign="center">
                                <Typography variant="h6" sx={{ color: "#3c4b57" }}>
                                    {item.value}
                                </Typography>
                                <Typography variant="h6" sx={{ color: "#3c4b57" }}>
                                    {item.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Follow Button */}
                    <Button
                        variant="contained"
                        sx={{
                            mt: 3,
                            backgroundColor: "#DFB5B5",
                            color: "#3c4b57",
                            borderRadius: "20px",
                            px: 4,
                            py: 1,
                            textTransform: "none",
                            '&:hover': {
                                backgroundColor: "#8a4040",
                            }
                        }}
                    >
                        Follow
                    </Button>

                    {/* Posts Section */}
                    <Box width="100%" maxWidth="800px" mt={4} px={2}>
                        <Box 
                            display="flex" 
                            justifyContent="space-between" 
                            alignItems="center"
                            mb={2}
                        >
                            <Typography variant="h5" sx={{ color: "#3c4b57" }}>
                                User name posts:
                            </Typography>
                            {/* Additional button could be added here if needed */}
                        </Box>
                        {/* Post content would go here */}
                    </Box>
                </Box>
            </div>
            <Footer />
        </div>
    );
}

export default ProfileView;