import 'package:flutter/material.dart';

void main() {
  runApp(const NcApp());
}

class NcApp extends StatelessWidget {
  const NcApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Nc E-commerce',
      theme: ThemeData(
        primaryColor: const Color(0xFF000000),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF000000),
          secondary: const Color(0xFFFF3366),
          tertiary: const Color(0xFF00FF88),
        ),
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text(
          'Nc',
          style: TextStyle(
            color: Colors.black,
            fontWeight: FontWeight.w900,
          ),
        ),
      ),
      body: const Center(
        child: Text(
          'Nc Mobile App - Coming Soon',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.w900),
        ),
      ),
    );
  }
}
