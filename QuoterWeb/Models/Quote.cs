﻿using System;
using System.ComponentModel.DataAnnotations;

namespace QuoterWeb.Models
{
    public class Quote
    {
        public int Id { get; set; }

        [Range(1, int.MaxValue)]
        public int CategoryId { get; set; }

        [Required]
        public string Body { get; set; }

        [Required]
        public string Author { get; set; }

        public DateTime CreatedAt { get; set; }

        public Category Category { get; set; }
    }
}