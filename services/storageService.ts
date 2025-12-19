
export interface StorageData {
  indicatorId: number;
  applicability: boolean;
  compliance: boolean;
  implementation: string;
  links: any[];
}

class StorageService {
  private apiUri: string | null = localStorage.getItem('argalis_sheets_api_uri');

  setApiUri(uri: string) {
    this.apiUri = uri;
    localStorage.setItem('argalis_sheets_api_uri', uri);
  }

  getApiUri() {
    return this.apiUri;
  }

  async saveIndicator(data: StorageData): Promise<boolean> {
    // Sauvegarde locale systématique
    localStorage.setItem(`argalis_indicator_${data.indicatorId}_applicability`, JSON.stringify(data.applicability));
    localStorage.setItem(`argalis_indicator_${data.indicatorId}_compliance`, JSON.stringify(data.compliance));
    localStorage.setItem(`argalis_indicator_${data.indicatorId}_implementation`, data.implementation);
    localStorage.setItem(`argalis_indicator_${data.indicatorId}_links`, JSON.stringify(data.links));

    if (!this.apiUri) return true;

    try {
      // Note: Google Apps Script POST nécessite souvent 'no-cors' pour éviter les preflights complexes
      // mais on ne peut pas lire la réponse. C'est acceptable pour un "save".
      await fetch(this.apiUri, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save', ...data })
      });
      return true; 
    } catch (error) {
      console.error("Sync error:", error);
      return false;
    }
  }

  async fetchAll(): Promise<StorageData[] | null> {
    if (!this.apiUri) return null;
    try {
      // Pour le GET, Google Apps Script gère bien les redirections si configuré correctement
      const response = await fetch(`${this.apiUri}?action=getAll`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      
      // Mise à jour du cache local avec les données distantes
      if (Array.isArray(data)) {
        data.forEach((item: StorageData) => {
          localStorage.setItem(`argalis_indicator_${item.indicatorId}_applicability`, JSON.stringify(item.applicability));
          localStorage.setItem(`argalis_indicator_${item.indicatorId}_compliance`, JSON.stringify(item.compliance));
          localStorage.setItem(`argalis_indicator_${item.indicatorId}_implementation`, item.implementation);
          localStorage.setItem(`argalis_indicator_${item.indicatorId}_links`, JSON.stringify(item.links));
        });
      }
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      return null;
    }
  }
}

export const storageService = new StorageService();
