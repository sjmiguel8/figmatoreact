import React, { useState, useRef } from 'react';
import {
  Box,
  Input,
  Button,
  Text,
  VStack,
  HStack,
  Flex,
  useToast,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import './App.css';

const MotionBox = motion(Box);

function App() {
  return (
    <Box minH="100vh" bg="gray.50" py={8}>
      <FigmaConverter />
    </Box>
  );
}

const FigmaConverter = () => {
  const [figmaUrl, setFigmaUrl] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState(null);
  const fileInputRef = useRef(null);
  const toast = useToast();

  const handleUrlChange = (e) => {
    setFigmaUrl(e.target.value);
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleConvert = async () => {
    setIsLoading(true);
    try {
      // Mock API call - replace with your actual API
      let payload = {};
      
      if (figmaUrl) {
        payload = { figmaUrl };
      } else if (file) {
        const fileData = await convertToBase64(file);
        payload = { fileData };
      }
      
      // Simulate API call with timeout
      setTimeout(() => {
        setGeneratedCode("// Generated React code would appear here\nconst MyComponent = () => {\n  return <div>Hello from Figma!</div>;\n};\n\nexport default MyComponent;");
        setIsLoading(false);
        toast({
          title: "Conversion complete!",
          description: "Your Figma design has been converted to React code.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }, 2000);
      
    } catch (error) {
      console.error('Conversion error:', error);
      setIsLoading(false);
      toast({
        title: "Conversion failed",
        description: "There was an error converting your design.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedCode], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "FigmaComponent.jsx";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const isInputProvided = figmaUrl.trim() !== '' || file !== null;

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      bg="white"
      rounded="3xl"
      shadow="xl"
      p={8}
      maxW="600px"
      w="100%"
    >
      <VStack spacing={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" color="purple.500">
          🎨 Figma to React Converter
        </Text>
        
        <Box>
          <Text mb={2} fontWeight="medium">Figma URL</Text>
          <Input
            placeholder="Paste your Figma URL here..."
            value={figmaUrl}
            onChange={handleUrlChange}
            size="lg"
            borderRadius="xl"
            borderWidth="2px"
            borderColor="gray.200"
            _focus={{ borderColor: "purple.300", boxShadow: "0 0 0 1px purple.300" }}
          />
        </Box>
        
        <Text textAlign="center" fontWeight="medium" color="gray.500">- OR -</Text>
        
        <Box
          border="2px dashed"
          borderColor="purple.200"
          borderRadius="2xl"
          p={6}
          bg="purple.50"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          cursor="pointer"
          textAlign="center"
          transition="all 0.2s"
          _hover={{ bg: "purple.100" }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            accept=".fig"
          />
          <Text color="purple.500" mb={2}>
            🖼️ Drag & drop your Figma file here
          </Text>
          <Text fontSize="sm" color="gray.500">
            or click to browse
          </Text>
        </Box>
        
        {file && (
          <Tag size="lg" borderRadius="full" variant="subtle" colorScheme="purple" p={2}>
            <TagLabel>{file.name}</TagLabel>
            <TagCloseButton onClick={handleRemoveFile} />
          </Tag>
        )}
        
        <Button
          colorScheme="purple"
          size="lg"
          isDisabled={!isInputProvided}
          isLoading={isLoading}
          loadingText="Converting..."
          onClick={handleConvert}
          borderRadius="full"
          py={6}
          _hover={{ transform: "scale(1.05)" }}
          transition="transform 0.2s"
        >
          {isLoading ? (
            "Converting..."
          ) : (
            <HStack>
              <Text>Convert to React</Text>
              <Text fontSize="xl">🤖</Text>
            </HStack>
          )}
        </Button>
        
        {isLoading && (
          <Flex justify="center" py={4}>
            <MotionBox
              width="16px"
              height="16px"
              borderRadius="full"
              bg="purple.500"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "loop",
              }}
              mx={1}
            />
            <MotionBox
              width="16px"
              height="16px"
              borderRadius="full"
              bg="pink.500"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.2,
              }}
              mx={1}
            />
            <MotionBox
              width="16px"
              height="16px"
              borderRadius="full"
              bg="blue.500"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.4,
              }}
              mx={1}
            />
          </Flex>
        )}
        
        {generatedCode && (
          <MotionBox
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            bg="gray.50"
            p={4}
            borderRadius="xl"
            mt={4}
          >
            <Text fontWeight="medium" mb={2}>Generated React Code:</Text>
            <Box
              bg="gray.800"
              color="white"
              p={4}
              borderRadius="lg"
              fontFamily="monospace"
              fontSize="sm"
              overflowX="auto"
              whiteSpace="pre"
            >
              {generatedCode}
            </Box>
            <Flex justify="center" mt={4}>
              <Button
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                colorScheme="green"
                leftIcon={<Text>📥</Text>}
                onClick={handleDownload}
                borderRadius="full"
              >
                Download Code
              </Button>
            </Flex>
          </MotionBox>
        )}
      </VStack>
    </MotionBox>
  );
};

export default App;