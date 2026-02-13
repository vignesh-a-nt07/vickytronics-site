#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  E-Commerce Project - Quick Start Script${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}\n"

# Function to handle errors
handle_error() {
    echo -e "${RED}✗ Error: $1${NC}"
    exit 1
}

# Step 1: Install Frontend Dependencies
echo -e "${YELLOW}[1/5] Installing frontend dependencies...${NC}"
if npm install > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    handle_error "Failed to install frontend dependencies"
fi

# Step 2: Install Backend Dependencies
echo -e "${YELLOW}[2/5] Installing backend dependencies...${NC}"
if cd server && npm install > /dev/null 2>&1 && cd ..; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    handle_error "Failed to install backend dependencies"
fi

# Step 3: Setup Database
echo -e "${YELLOW}[3/5] Setting up database...${NC}"
if npm run db:generate > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Prisma client generated${NC}"
else
    handle_error "Failed to generate Prisma client"
fi

echo -e "${YELLOW}    Running migrations...${NC}"
if npm run db:push > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Database migrations completed${NC}"
else
    echo -e "${YELLOW}⚠ Database push failed (check MySQL connection)${NC}"
    echo -e "${YELLOW}   Make sure MySQL is running or start with: docker-compose up -d mysql${NC}"
fi

# Step 4: Create startup scripts
echo -e "${YELLOW}[4/5] Creating startup scripts...${NC}"

# Backend startup script
cat > start-backend.sh << 'EOF'
#!/bin/bash
echo "Starting E-Commerce Backend..."
echo "Backend will run on http://localhost:3001"
cd server
npm run dev
EOF

# Frontend startup script
cat > start-frontend.sh << 'EOF'
#!/bin/bash
echo "Starting E-Commerce Frontend..."
echo "Frontend will run on http://localhost:3000"
npm run dev
EOF

# Full startup script
cat > start-all.sh << 'EOF'
#!/bin/bash
echo "Starting E-Commerce Project..."
echo "This script requires tmux or multiple terminals"
echo ""
echo "Backend will run on http://localhost:3001"
echo "Frontend will run on http://localhost:3000"
echo "Database admin: http://localhost:8080"
echo ""
echo "Option 1: Using Docker Compose (Recommended)"
echo "  docker-compose up"
echo ""
echo "Option 2: Manual startup (requires 2 terminals)"
echo "  Terminal 1: bash start-backend.sh"
echo "  Terminal 2: bash start-frontend.sh"
EOF

chmod +x start-backend.sh start-frontend.sh start-all.sh
echo -e "${GREEN}✓ Startup scripts created${NC}"

# Step 5: Summary
echo -e "${YELLOW}[5/5] Setup complete!${NC}\n"

echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ All components ready!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}\n"

echo -e "${YELLOW}🚀 Quick Start Options:${NC}\n"

echo "  Option 1: Docker Compose (Easiest - Recommended)"
echo -e "    ${GREEN}docker-compose up${NC}\n"

echo "  Option 2: Manual Startup (2 terminals)"
echo -e "    Terminal 1: ${GREEN}bash start-backend.sh${NC}"
echo -e "    Terminal 2: ${GREEN}bash start-frontend.sh${NC}\n"

echo "  Option 3: Direct Commands"
echo -e "    Terminal 1: ${GREEN}cd server && npm run dev${NC}"
echo -e "    Terminal 2: ${GREEN}npm run dev${NC}\n"

echo -e "${YELLOW}📱 Access Points:${NC}"
echo -e "  Frontend: ${GREEN}http://localhost:3000${NC}"
echo -e "  Backend API: ${GREEN}http://localhost:3001${NC}"
echo -e "  Database Admin (PhpMyAdmin): ${GREEN}http://localhost:8080${NC}"
echo -e "  Database Studio: ${GREEN}npm run db:studio${NC}\n"

echo -e "${YELLOW}📚 Documentation:${NC}"
echo -e "  Setup Guide: ${GREEN}LOCAL_SETUP_GUIDE.md${NC}"
echo -e "  Project Info: ${GREEN}README.md${NC}\n"

echo -e "${YELLOW}⚠️  Prerequisites Check:${NC}"

# Check MySQL
if mysql -u root -pnavat -e "SELECT 1" &> /dev/null; then
    echo -e "  ${GREEN}✓ MySQL is running${NC}"
else
    echo -e "  ${RED}✗ MySQL not accessible (run: docker-compose up -d mysql)${NC}"
fi

# Check Node
echo -e "  ${GREEN}✓ Node.js $(node --version)${NC}"
echo -e "  ${GREEN}✓ npm $(npm --version)${NC}\n"

echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "Happy coding! 🎉"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}\n"
