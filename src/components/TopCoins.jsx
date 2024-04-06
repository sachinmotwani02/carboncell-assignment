import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function TopCoins() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src="https://s2.coinmarketcap.com/static/img/coins/200x200/1027.png"
            alt="Avatar"
          />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">ETH</p>
          <p className="text-sm text-muted-foreground">Ethereum</p>
        </div>
        <div className="ml-auto font-medium">$1,999.78</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwBxAiGB6uxJMWGdMTtJpAyEwFlPwnrUKX4O08rUaifg&s"
            alt="Avatar"
          />
          <AvatarFallback>JL</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">SOL</p>
          <p className="text-sm text-muted-foreground">Solana</p>
        </div>
        <div className="ml-auto font-medium">$172.59</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src="https://s2.coinmarketcap.com/static/img/coins/200x200/1975.png"
            alt="Avatar"
          />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">LINK</p>
          <p className="text-sm text-muted-foreground">Chainlink</p>
        </div>
        <div className="ml-auto font-medium">$17.47</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5nDsgUkVRxKzcYj0T5OG96fRiT9XNeTRAK01BdgGHew&s"
            alt="Avatar"
          />
          <AvatarFallback>WK</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">MATIC</p>
          <p className="text-sm text-muted-foreground">Polygon</p>
        </div>
        <div className="ml-auto font-medium">$0.88</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src="https://s2.coinmarketcap.com/static/img/coins/200x200/29210.png"
            alt="Avatar"
          />
          <AvatarFallback>SD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">JUP</p>
          <p className="text-sm text-muted-foreground">Jupiter</p>
        </div>
        <div className="ml-auto font-medium">$118.39</div>
      </div>
    </div>
  );
}
