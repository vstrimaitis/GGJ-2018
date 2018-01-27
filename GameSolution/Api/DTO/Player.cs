﻿using System;
using System.Collections.Generic;

namespace Web.DTO
{
    public class Player
    {
        public int Id { get; set; }
        public int Score { get; set; }
        public string Color { get; set; }

        public Player(int id)
        {
            Id = id;
            var colorIndex = new Random().Next(0, Colors.Count - 1);
            Color = Colors[new Random().Next(0, Colors.Count - 1)];
            Colors.RemoveAt(colorIndex); 
        }

        public static List<string> Colors { get; set; }

        static Player()
        {
            Colors = new List<string>(new string[] { "red", "green", "blue", "black", "brown" });
        }
    }
}
