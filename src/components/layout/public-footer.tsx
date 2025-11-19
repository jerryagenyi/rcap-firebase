
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PublicFooter() {
    return (
        <footer className="border-t">
            <div className="container flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
                <p className="text-sm text-muted-foreground">
                    © 2025 HealthLink RCAP • A New Way to Coordinate Public Health
                </p>
                <div className="flex gap-2">
                    <Button variant="link" size="sm" asChild>
                        <Link href="#">Terms of Service</Link>
                    </Button>
                     <Button variant="link" size="sm" asChild>
                        <Link href="#">Privacy Policy</Link>
                    </Button>
                </div>
            </div>
      </footer>
    );
}
