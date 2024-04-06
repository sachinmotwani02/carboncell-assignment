import { useState, useEffect } from 'react';
import './App.css';
import Sidebar, { SidebarItem } from './components/Sidebar';
import { Home, User, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PopulationGraph } from './components/PopulationGraph';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { TopCoins } from './components/TopCoins';
import logo from '../src/assets/logo.png';
import Web3 from 'web3';
import { useToast } from '@/components/ui/use-toast';
import { ToastProvider, ToastViewport } from '@/components/ui/toast';

function App() {
  const [priceData, setPriceData] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coindesk.com/v1/bpi/currentprice.json'
        );
        const data = await response.json();
        setPriceData(data.bpi);
        console.log(data.bpi);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Create Web3 instance
        const web3 = new Web3(window.ethereum);

        // Get the selected account
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        setSelectedAccount(account);

        console.log('MetaMask wallet connected:', account);
        toast({
          title: 'Wallet Connected',
          description: `Connected to MetaMask wallet: ${account}`,
        });
        console.log('after toast');
      } catch (error) {
        console.error('MetaMask connection error:', error);
        toast({
          variant: 'destructive',
          title: 'Connection Error',
          description: 'Failed to connect to MetaMask wallet.',
        });
      }
    } else {
      console.error('MetaMask not detected');
      toast({
        variant: 'destructive',
        title: 'MetaMask Not Detected',
        description: 'Please install MetaMask to connect your wallet.',
      });
    }
  };

  if (!priceData) {
    return;
  }

  return (
    <div className="flex w-full bg-muted/40">
      <Sidebar>
        <SidebarItem icon={<Home size={20} />} text="Dashboard" active />
        <SidebarItem icon={<User size={20} />} text="Profile" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" alert />
      </Sidebar>
      <div className="flex flex-1 w-full flex-col ">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 hidden md:flex">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <a
              href="#"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Orders
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Products
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Customers
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Analytics
            </a>
          </nav>
        </header>
        <div className="flex h-14 items-center justify-between w-full gap-4 border-b bg-muted/40 px-4 md:hidden lg:hidden lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <div className="flex justify-between items-center w-full ">
                <img src={logo} className="w-28" alt="" />
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </div>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium mt-4">
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl  px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <User className="h-5 w-5" />
                  Profile
                </a>
                <a
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex p-4 items-center justify-between">
          <h3 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
            Bitcoin Price Index
            {/* <span className="text-slate-400 text-base"> BTC</span> */}
          </h3>
          <div className="flex items-center space-x-2">
            <Button onClick={connectWallet}>
              {selectedAccount ? 'Connected' : 'Connect to Metamask'}
            </Button>
          </div>
        </div>
        <div className="grid px-4 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {priceData.USD && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">USD</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-dollar-sign h-4 w-4 text-muted-foreground"
                >
                  <line x1="12" x2="12" y1="2" y2="22" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${Number(priceData.USD.rate_float).toFixed(2)}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p> */}
              </CardContent>
            </Card>
          )}
          {priceData.GBP && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pound Sterling
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pound-sterling h-4 w-4 text-muted-foreground"
                >
                  <path d="M18 7c0-5.333-8-5.333-8 0" />
                  <path d="M10 7v14" />
                  <path d="M6 21h12" />
                  <path d="M6 13h10" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  £{Number(priceData.GBP.rate_float).toFixed(2)}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p> */}
              </CardContent>
            </Card>
          )}
          {priceData.EUR && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Euro</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-euro h-4 w-4 text-muted-foreground"
                >
                  <path d="M4 10h12" />
                  <path d="M4 14h9" />
                  <path d="M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  €{Number(priceData.EUR.rate_float).toFixed(2)}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                +19% from last month
              </p> */}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid p-4 grid-cols-1 gap-4 lg:grid-cols-7">
          <Card className="col-span-1 lg:col-span-4">
            <CardHeader>
              <CardTitle className="text-base">
                Population Over The Years
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <PopulationGraph />
            </CardContent>
          </Card>
          <Card className="col-span-1 lg:col-span-3">
            <CardHeader>
              <CardTitle className="text-base">Trending Coins</CardTitle>
              {/* <CardDescription>You made 265 sales this month.</CardDescription> */}
            </CardHeader>
            <CardContent>
              <TopCoins />
            </CardContent>
          </Card>
        </div>
        <ToastProvider>
          <ToastViewport />
        </ToastProvider>
      </div>
    </div>
  );
}

export default App;
