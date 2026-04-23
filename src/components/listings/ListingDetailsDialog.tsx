import { MapPin, Star, Phone, User as UserIcon, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import InquiryDialog from "./InquiryDialog";

export interface ListingItem {
  id: string | number;
  title: string;
  location: string;
  price: string;
  status: string;
  rating?: number;
  owner?: string;
  user_id?: string;
  details?: string[];
  description?: string;
  contact_phone?: string;
  created_at?: string;
}

interface Props {
  listing: ListingItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ListingDetailsDialog = ({ listing, open, onOpenChange }: Props) => {
  if (!listing) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-start justify-between gap-3">
            <DialogTitle className="font-display text-xl">{listing.title}</DialogTitle>
            <Badge className={listing.status === "Mövcud" ? "bg-green text-green-foreground shrink-0" : "shrink-0"}>
              {listing.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <p className="text-3xl font-display font-bold text-primary">{listing.price}</p>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {listing.location}
            </div>
            {listing.owner && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <UserIcon className="h-4 w-4" /> {listing.owner}
              </div>
            )}
            {listing.contact_phone && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" /> {listing.contact_phone}
              </div>
            )}
            {listing.rating && (
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-orange text-orange" />
                <span className="font-medium">{listing.rating}</span>
              </div>
            )}
            {listing.created_at && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" /> {new Date(listing.created_at).toLocaleDateString("az-AZ")}
              </div>
            )}
          </div>

          {listing.details && listing.details.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {listing.details.map((d) => (
                <span key={d} className="text-xs bg-muted px-2.5 py-1 rounded-full text-muted-foreground">{d}</span>
              ))}
            </div>
          )}

          {listing.description && (
            <p className="text-sm text-muted-foreground leading-relaxed border-t pt-3">{listing.description}</p>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>Bağla</Button>
          <InquiryDialog
            listingId={String(listing.id)}
            listingTitle={listing.title}
            ownerUserId={listing.user_id}
            trigger={
              <Button className="flex-1 bg-orange hover:bg-orange/90 text-orange-foreground">Sifariş et</Button>
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ListingDetailsDialog;
