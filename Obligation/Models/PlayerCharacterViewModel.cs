using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Obligation.Models
{
    public class PlayerCharacterViewModel
    {
        public string CharacterName { get; set; }
        public int Obligation { get; set; }
        public int ObligationRangeStart { get; set; }
        public int ObligationRangeEnd { get; set; }
        public bool HasObligation { get; set; }
        public bool HasCriticalObligation { get; set; }
    }
}
