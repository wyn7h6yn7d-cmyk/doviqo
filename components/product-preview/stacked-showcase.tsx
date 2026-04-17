import { Card } from "@/components/ui/card";
import { PanelHeader } from "@/components/ui/panel-header";
import { ProductActionItemsCard } from "@/components/mock/action-items-card";
import { ProductOwnersCard } from "@/components/mock/owners-card";
import { SlackRecapCard } from "@/components/mock/slack-recap-card";
import { EmailDraftCard } from "@/components/mock/email-draft-card";
import type { Meeting } from "@/lib/constants";

export function StackedShowcase({ meeting }: { meeting: Meeting }) {
  return (
    <div className="grid gap-4 sm:gap-5 lg:hidden">
      <ProductActionItemsCard meeting={meeting} />

      <ProductOwnersCard meeting={meeting} />

      <Card className="p-5 sm:p-6">
        <PanelHeader title="Kokkuvõte ja tähtajad" meta="Kopeerimiseks valmis" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <SlackRecapCard text={meeting.recap} />
          <div className="rounded-xl border border-white/10 bg-black/30 p-3">
            <p className="text-[11px] font-medium text-white/65">Kontekst järelkirjale</p>
            <p className="mt-2 text-sm leading-7 text-white/78">
              Vastutajad ja tähtajad sees — mis edasi juhtub, on kohe näha.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <PanelHeader title="Genereeritud järelkiri" meta="Valmis" />
        <div className="mt-4">
          <EmailDraftCard body={meeting.followUp} />
        </div>
        <p className="mt-4 text-xs text-white/55">
          Vaata üle, saada ja hoia töö koosolekute vahel liikumas.
        </p>
      </Card>
    </div>
  );
}
